import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: change base to '/contact.vanhkhuc/'
  // base: '/contact.vanhkhuc/',
})
