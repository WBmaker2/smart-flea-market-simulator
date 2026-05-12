import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/smart-flea-market-simulator/' : '/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: []
  }
}));
