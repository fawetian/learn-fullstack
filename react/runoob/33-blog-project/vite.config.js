/**
 * 33-blog-project: Vite 构建配置
 * 来源章节: https://www.runoob.com/react/react-blog-project-init.html
 *
 * 这是 React 的 Vite 构建工具配置，作用是定义项目如何编译和打包。
 * 需要注意：@vitejs/plugin-react 插件会自动处理 JSX 编译和 Fast Refresh（HMR）。
 */

import { defineConfig } from 'vite'
// 这是 React 的 Vite 官方插件，作用是提供 JSX 编译和 React Fast Refresh 热更新支持
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 这是 React 的插件注册方式，作用是将 React 插件集成到 Vite 构建流程中
  plugins: [react()],
})
