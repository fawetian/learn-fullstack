/**
 * 33-blog-project: 应用入口文件
 * 来源章节: https://www.runoob.com/react/react-blog-project-init.html
 *
 * 这是 React 的 18 版入口文件，作用是创建 React 根实例并将 App 组件挂载到 DOM。
 * 需要注意：React 18 使用 createRoot 替代了 ReactDOM.render，支持并发特性（Concurrent Features）。
 */

import React from 'react'
// 这是 React 的 DOM 客户端渲染入口，作用是提供 createRoot API 将 React 组件挂载到真实 DOM
import ReactDOM from 'react-dom/client'
// 这是 React 的根组件，作用是整个博客应用的组件树入口
import App from './App.jsx'

// 这是 React 的 DOM 挂载点获取，作用是从 HTML 中找到 id="root" 的容器
// 需要注意：如果 root 不存在，createRoot 会报错，因此确保 index.html 中有对应 div
const root = ReactDOM.createRoot(document.getElementById('root'))

// 这是 React 的严格模式（StrictMode），作用是检测潜在副作用并帮助发现常见问题
// 需要注意：StrictMode 在开发模式下会故意双重渲染组件，帮助检测副作用
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
