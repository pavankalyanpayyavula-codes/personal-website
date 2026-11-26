import fs from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Read .env straight from disk on every server (re)start. Vite's loadEnv lets
// existing process.env values win, which kept stale values after edits.
const readDotEnv = (file = '.env') => {
  if (!fs.existsSync(file)) return {};
  const env = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match) env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
  return env;
};

// Runs api/contact.js inside the dev server, so the contact form sends real
// email from `npm run dev`. Put EMAIL_USER and EMAIL_PASS in a .env file
// (git-ignored). On Vercel the same file runs as a serverless function.
const localApi = (env) => ({
  name: 'local-api',
  configureServer(server) {
    Object.assign(process.env, env);
    server.middlewares.use('/api/contact', async (req, res) => {
      let raw = '';
      for await (const chunk of req) raw += chunk;

      const { default: handler } = await server.ssrLoadModule('/api/contact.js');
      const vercelRes = {
        status(code) { res.statusCode = code; return this; },
        setHeader(key, value) { res.setHeader(key, value); return this; },
        json(data) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        },
      };
      try {
        await handler({ method: req.method, body: raw }, vercelRes);
      } catch (err) {
        console.error(err);
        vercelRes.status(500).json({ message: 'Local API error' });
      }
    });
  },
});

export default defineConfig(() => ({
  plugins: [react(), localApi(readDotEnv())],
  server: { port: 8000 },
  resolve: { alias: { '@': '/src' } },
}));
