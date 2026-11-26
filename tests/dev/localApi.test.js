// @vitest-environment node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { readDotEnv, createApiMiddleware, localApi } from '../../dev/localApi.js';

const tmpFiles = [];
function writeTmpEnv(contents) {
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
    const file = writeTmpEnv('# comment\r\nEMAIL_USER=me@gmail.com\r\n\r\nEMAIL_PASS=abcd efgh ijkl mnop  \r\n');
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

function mockNodeRes() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader(k, v) { this.headers[k] = v; },
    end(data) { this.body = data; },
  };
}

describe('createApiMiddleware', () => {
  it('passes the method and raw body to the handler and writes JSON back', async () => {
    const handler = vi.fn((req, res) => res.status(201).json({ got: req.body, method: req.method }));
    const middleware = createApiMiddleware(async () => handler);

    const req = Readable.from(['{"a":', '1}']);
    req.method = 'POST';
    const res = mockNodeRes();
    await middleware(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.headers['Content-Type']).toBe('application/json');
    expect(JSON.parse(res.body)).toEqual({ got: '{"a":1}', method: 'POST' });
  });

  it('supports setHeader chaining from the handler', async () => {
    const middleware = createApiMiddleware(async () => (req, res) =>
      res.setHeader('Allow', 'POST').status(405).json({ message: 'no' }));
    const req = Readable.from([]);
    req.method = 'GET';
    const res = mockNodeRes();
    await middleware(req, res);
    expect(res.headers.Allow).toBe('POST');
    expect(res.statusCode).toBe(405);
  });

  it('answers 500 when the handler throws', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const middleware = createApiMiddleware(async () => () => { throw new Error('boom'); });
    const req = Readable.from([]);
    req.method = 'POST';
    const res = mockNodeRes();
    await middleware(req, res);
    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res.body)).toEqual({ message: 'Local API error' });
  });
});

describe('localApi plugin', () => {
  it('copies env into process.env and mounts /api/contact', () => {
    const use = vi.fn();
    const plugin = localApi({ LOCAL_API_TEST_VAR: 'yes' });
    plugin.configureServer({ middlewares: { use }, ssrLoadModule: vi.fn() });

    expect(plugin.name).toBe('local-api');
    expect(process.env.LOCAL_API_TEST_VAR).toBe('yes');
    expect(use).toHaveBeenCalledWith('/api/contact', expect.any(Function));
    delete process.env.LOCAL_API_TEST_VAR;
  });

  it('loads the real handler through the dev server', async () => {
    const use = vi.fn();
    const handler = vi.fn((req, res) => res.status(200).json({ ok: true }));
    const ssrLoadModule = vi.fn(async () => ({ default: handler }));
    localApi({}).configureServer({ middlewares: { use }, ssrLoadModule });

    const middleware = use.mock.calls[0][1];
    const req = Readable.from([]);
    req.method = 'POST';
    const res = mockNodeRes();
    await middleware(req, res);

    expect(ssrLoadModule).toHaveBeenCalledWith('/api/contact.js');
    expect(handler).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });
});
