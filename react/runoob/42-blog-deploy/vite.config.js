/**
 * 42-blog-deploy: Vite 生产构建配置
 * 来源章节: https://www.runoob.com/react/react-blog-deploy-vercel.html
 *
 * 这是 React 的 Vite 生产配置，作用是优化构建输出并适配部署环境。
 * 需要注意：base 配置在部署到非根路径时（如 GitHub Pages）必须设置，否则资源路径会 404。
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 这是 React 的部署基础路径配置，如果部署到子目录（如 GitHub Pages 的 /repo-name/），需要修改此值
  // 需要注意：默认值为 '/'，Vercel/Netlify 等根域名部署无需修改
  base: '/',
  build: {
    // 这是 React 的构建输出目录，默认 'dist'，Vercel 等平台会自动识别
    outDir: 'dist',
    // 这是 React 的源码映射配置，生产环境建议关闭（减小体积）或保留（方便调试）
    sourcemap: false,
    // 这是 React 的代码分割配置，将第三方库打包为单独的 chunk，利用浏览器缓存
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 react 和 react-dom 打包为 vendor chunk，减少主 chunk 体积并提高缓存命中率
          vendor: ['react', 'react-dom'],
          // 将 react-router-dom 打包为单独 chunk
          router: ['react-router-dom'],
        },
      },
    },
  },
})
