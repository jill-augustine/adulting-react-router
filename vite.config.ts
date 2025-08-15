import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'import.meta.env.VERCEL_ENV': JSON.stringify(process.env.VERCEL_ENV || ''),
    'import.meta.env.VERCEL': JSON.stringify(process.env.VERCEL || ''),
    'import.meta.env.VERCEL_URL': JSON.stringify(process.env.VERCEL_URL || '')
  }
})
