import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    // ── Security: remove console.* and debugger statements from production bundle ──
    removeConsole(),
  ],
  build: {
    target: 'es2020',
    sourcemap: false,       // ── Security: never expose source maps in production
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    // ── Vite 8 uses Rolldown (Rust bundler) — rollupOptions → rolldownOptions ─
    // minify defaults to 'rolldown-esbuild' in Vite 8; leaving it unset uses
    // the best available minifier bundled with Rolldown.
    rolldownOptions: {
      treeshake: true,
      output: {
        // ── Code-split React into its own chunk for long-term caching ─────────
        // In Vite 8 / Rolldown, use codeSplitting instead of advancedChunks.
        codeSplitting: {
          groups: [
            { name: 'react-vendor', test: /node_modules\/(react|react-dom)\// },
          ],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    // ── Security: prevent DNS rebinding attacks in dev ───────────────────────
    host: 'localhost',
  },
});

