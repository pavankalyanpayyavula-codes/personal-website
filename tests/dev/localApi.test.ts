// @vitest-environment node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { Readable } from 'node:stream';
import type { ViteDevServer } from 'vite';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { createApiMiddleware, localApi, readDotEnv } from '../../dev/localApi';
import type { ApiRequest, ApiResponse } from '../../api/contact';

type Handler = (req: ApiRequest, res: ApiResponse) => unknown;

const tmpFiles: string[] = [];
function writeTmpEnv(contents: string): string {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'env-')), '.env');
  fs.writeFileSync(file, contents);
  tmpFiles.push(path.dirname(file));
  return file;
}

afterEach(() => {
  for (const dir of tmpFiles.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
  vi.restoreAllMocks();
});

describe('readDotEnv', () => {
  it('returns an empty object when the file does not exist', () => {
    expect(readDotEnv(path.join(os.tmpdir(), 'definitely-missing.env'))).toEqual({});
  });

  it('parses keys, skips comments and blank lines, and handles CRLF', () => {
    const file = writeTmpEnv(
      '# comment\r\nEMAIL_USER=me@gmail.com\r\n\r\nEMAIL_PASS=abcd efgh ijkl mnop  \r\n',
    );
    expect(readDotEnv(file)).toEqual({
      EMAIL_USER: 'me@gmail.com',
      EMAIL_PASS: 'abcd efgh ijkl mnop',
    });
  });

  it('strips matching single or double quotes', () => {
    const file = writeTmpEnv(`A="quoted value"\nB='single'\nC="mismatched'`);
    expect(readDotEnv(file)).toEqual({ A: 'quoted value', B: 'single', C: `"mismatched'` });
  });

  it('keeps empty values', () => {
    expect(readDotEnv(writeTmpEnv('EMAIL_PASS=\n'))).toEqual({ EMAIL_PASS: '' });
  });
});

interface FakeNodeResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
  setHeader(name: string, value: string): void;
  end(data: string): void;
}

function mockNodeRes(): FakeNodeResponse {
  return {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(name, value) {
      this.headers[name] = value;
    },
    end(data) {
      this.body = data;
    },
  };
}

/** A readable request stream carrying the given body chunks and method. */
function mockNodeReq(chunks: string[], method: string): IncomingMessage {
  return Object.assign(Readable.from(chunks), { method }) as unknown as IncomingMessage;
}

/** Runs a middleware against fake Node request/response objects. */
async function run(
  middleware: (req: IncomingMessage, res: ServerResponse) => Promise<void>,
  req: IncomingMessage,
): Promise<FakeNodeResponse> {
  const res = mockNodeRes();
  await middleware(req, res as unknown as ServerResponse);
  return res;
}

describe('createApiMiddleware', () => {
  it('passes the method and raw body to the handler and writes JSON back', async () => {
    const handler = vi.fn<Handler>((req, res) =>
      res.status(201).json({ message: `${req.method} ${String(req.body)}` }),
    );
    const res = await run(
      createApiMiddleware(async () => handler),
      mockNodeReq(['{"a":', '1}'], 'POST'),
    );

    expect(res.statusCode).toBe(201);
    expect(res.headers['Content-Type']).toBe('application/json');
    expect(JSON.parse(res.body)).toEqual({ message: 'POST {"a":1}' });
  });

  it('supports setHeader chaining from the handler', async () => {
    const handler: Handler = (_req, res) =>
      res.setHeader('Allow', 'POST').status(405).json({ message: 'no' });
    const res = await run(
      createApiMiddleware(async () => handler),
      mockNodeReq([], 'GET'),
    );
    expect(res.headers.Allow).toBe('POST');
    expect(res.statusCode).toBe(405);
  });

  it('answers 500 when the handler throws', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const handler: Handler = () => {
      throw new Error('boom');
    };
    const res = await run(
      createApiMiddleware(async () => handler),
      mockNodeReq([], 'POST'),
    );
    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res.body)).toEqual({ message: 'Local API error' });
  });
});

type Middleware = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

/** Calls the plugin's configureServer hook with a fake dev server. */
function startPlugin(env: Record<string, string>, ssrLoadModule = vi.fn()) {
  const use = vi.fn<(path: string, middleware: Middleware) => void>();
  const plugin = localApi(env);
  const configureServer = plugin.configureServer as (server: ViteDevServer) => void;
  configureServer({ middlewares: { use }, ssrLoadModule } as unknown as ViteDevServer);
  return { plugin, use, ssrLoadModule };
}

describe('localApi plugin', () => {
  it('copies env into process.env and mounts /api/contact', () => {
    const { plugin, use } = startPlugin({ LOCAL_API_TEST_VAR: 'yes' });

    expect(plugin.name).toBe('local-api');
    expect(process.env.LOCAL_API_TEST_VAR).toBe('yes');
    expect(use).toHaveBeenCalledWith('/api/contact', expect.any(Function));
    delete process.env.LOCAL_API_TEST_VAR;
  });

  it('loads the real handler through the dev server', async () => {
    const handler = vi.fn<Handler>((_req, res) => res.status(200).json({ message: 'ok' }));
    const { use, ssrLoadModule } = startPlugin(
      {},
      vi.fn(async () => ({ default: handler })),
    );

    const middleware = use.mock.calls[0]?.[1];
    if (!middleware) throw new Error('middleware was not mounted');
    const res = await run(middleware, mockNodeReq([], 'POST'));

    expect(ssrLoadModule).toHaveBeenCalledWith('/api/contact.ts');
    expect(handler).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });
});
