import fs from 'node:fs';

// Read .env straight from disk on every server (re)start. Vite's loadEnv lets
// existing process.env values win, which kept stale values after edits.
export const readDotEnv = (file = '.env') => {
  if (!fs.existsSync(file)) return {};
  const env = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match) env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
  return env;
};

// Adapts a Node request/response pair to the small Vercel-style API the
// handler uses (req.method, req.body, res.status().json(), res.setHeader()).
export const createApiMiddleware = (loadHandler) => async (req, res) => {
  let raw = '';
  for await (const chunk of req) raw += chunk;

  const vercelRes = {
    status(code) { res.statusCode = code; return this; },
    setHeader(key, value) { res.setHeader(key, value); return this; },
    json(data) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    },
  };

  try {
    const handler = await loadHandler();
    await handler({ method: req.method, body: raw }, vercelRes);
  } catch (err) {
    console.error(err);
    vercelRes.status(500).json({ message: 'Local API error' });
  }
};

// Vite plugin: runs api/contact.js inside `npm run dev`, so the contact form
// sends real email locally. On Vercel the same file runs as a function.
export const localApi = (env) => ({
  name: 'local-api',
  configureServer(server) {
    Object.assign(process.env, env);
    server.middlewares.use(
      '/api/contact',
      createApiMiddleware(async () => (await server.ssrLoadModule('/api/contact.js')).default),
    );
  },
});
