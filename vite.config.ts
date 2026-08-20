import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@storage': path.resolve(import.meta.dirname, './storage'),
      '@titanui': path.resolve(import.meta.dirname, './src/editor/TitanUI')
    }
  },
  server: {
    host: '127.0.0.1',
    port: 8086,
    strictPort: true
  }
})
