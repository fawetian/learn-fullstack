/**
 * ============================================================
 * 章节: React 博客项目：初始化
 * 文件: react/runoob/33-blog-project/src/main.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
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
