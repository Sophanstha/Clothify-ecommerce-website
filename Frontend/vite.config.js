import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          icons: ['react-icons'],
          animations: ['framer-motion', 'swiper'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
