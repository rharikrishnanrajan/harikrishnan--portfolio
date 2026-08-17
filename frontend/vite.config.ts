import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,       // ── Security: never expose source maps in production
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    // ── Security: strip all console output from production bundle ─────────────
    // Prevents accidental logging of sensitive data visible in browser DevTools.
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  esbuild: {
    // ── Security: remove console.* and debugger statements from production ────
    drop: ['console', 'debugger'],
  },
  server: {
    port: 5173,
    strictPort: false,
    // ── Security: prevent DNS rebinding attacks in dev ───────────────────────
    host: 'localhost',
  },
});

