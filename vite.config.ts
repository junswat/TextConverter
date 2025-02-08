import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/TextConverter/',  // リポジトリ名を指定
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
