import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://15.164.234.32.nip.io'),
    'import.meta.env.VITE_KAKAO_APP_KEY': JSON.stringify('YOUR_KAKAO_APP_KEY_HERE'),
  },
})
