import fs from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin, ViteDevServer } from 'vite';
import type { ApiRequest, ApiResponse } from '../api/contact';

type ApiHandler = (req: ApiRequest, res: ApiResponse) => unknown;

/**
 * Reads .env straight from disk on every dev-server (re)start. Vite's loadEnv
 * lets existing process.env values win, which kept stale values after edits.
 */
export const readDotEnv = (file = '.env'): Record<string, string> => {
  if (!fs.existsSync(file)) return {};
  const env: Record<string, string> = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    const [, key, value = ''] = match ?? [];
    if (key) env[key] = value.replace(/^(['"])(.*)\1$/, '$2');
  }
  return env;
};

/**
 * Adapts a Node request/response pair to the small Vercel-style API the
 * handler uses (req.method, req.body, res.status().json(), res.setHeader()).
 */
export const createApiMiddleware =
  (loadHandler: () => Promise<ApiHandler>) =>
  async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    let raw = '';
    for await (const chunk of req) raw += String(chunk);

    const apiRes: ApiResponse = {
      status(code) {
        res.statusCode = code;
        return this;
      },
      setHeader(name, value) {
        res.setHeader(name, value);
        return this;
      },
      json(data) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      },
    };

    try {
      const handler = await loadHandler();
      await handler({ method: req.method, body: raw }, apiRes);
    } catch (err) {
      console.error(err);
      apiRes.status(500).json({ message: 'Local API error' });
    }
  };

/**
 * Vite plugin: runs api/contact.ts inside `npm run dev`, so the contact form
 * sends real email locally. On Vercel the same file runs as a function.
 */
export const localApi = (env: Record<string, string>): Plugin => ({
  name: 'local-api',
  configureServer(server: ViteDevServer) {
    Object.assign(process.env, env);
    server.middlewares.use(
      '/api/contact',
      createApiMiddleware(
        async () => (await server.ssrLoadModule('/api/contact.ts')).default as ApiHandler,
      ),
    );
  },
});
