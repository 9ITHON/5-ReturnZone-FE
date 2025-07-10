import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'https://15.164.234.32.nip.io',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
