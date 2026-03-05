import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Raise warning threshold slightly so legitimate large chunks are visible
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Heavy animation library in its own chunk
          'vendor-motion': ['framer-motion'],
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Form handling
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Icon packs (large)
          'vendor-icons': ['react-icons'],
        },
      },
    },
  },
})
