
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base 设置为 './' 确保在 GitHub Pages 的二级目录下也能正确加载资源
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
