import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: [
    '**/*.JPG',
    '**/*.WEBP',
    '**/*.PNG',
    '**/*.GIF', // Added support for GIF images
  ],
})
