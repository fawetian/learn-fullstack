/**
 * ============================================================
 * 章节: React 博客项目：部署
 * 文件: react/runoob/42-blog-deploy/vite.config.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
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
