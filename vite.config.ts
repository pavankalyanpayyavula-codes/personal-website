/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { localApi, readDotEnv } from './dev/localApi';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  // EMAIL_USER / EMAIL_PASS come from .env (git-ignored); see .env.example.
  plugins: [react(), localApi(readDotEnv())],
  server: { port: 8000 },
  resolve: { alias: { '@': '/src' } },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    // Server-side tests live in tests/ — never in api/, where Vercel would
    // deploy each file as a function.
    include: ['src/**/*.test.{ts,tsx}', 'tests/**/*.test.ts'],
  },
}));
