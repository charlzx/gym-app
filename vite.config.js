import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/gym-app/',
  build: {
    outDir: 'dist',
  },

  // Copy index.html to 404.html after build
  closeBundle() {
    const distPath = path.resolve(__dirname, 'dist')
    const indexFile = path.join(distPath, 'index.html')
    const notFoundFile = path.join(distPath, '404.html')

    if (fs.existsSync(indexFile)) {
      fs.copyFileSync(indexFile, notFoundFile)
      console.log('✅ 404.html generated for GitHub Pages.')
    } else {
      console.warn('⚠️ index.html not found. Skipping 404.html generation.')
    }
  }
})
