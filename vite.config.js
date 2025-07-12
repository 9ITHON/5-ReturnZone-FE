import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), netlifyPlugin()],
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

