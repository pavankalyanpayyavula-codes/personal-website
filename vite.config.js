import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

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

export default defineConfig(({ mode }) => ({
  plugins: [react(), localApi(loadEnv(mode, process.cwd(), ''))],
  server: { port: 8000 },
  resolve: { alias: { '@': '/src' } },
}));
