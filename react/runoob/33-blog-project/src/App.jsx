/**
 * ============================================================
 * 章节: React 博客项目：初始化
 * 文件: react/runoob/33-blog-project/src/App.jsx
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

// 这是 React 的函数组件，作用是定义整个博客应用的 UI 结构
// 需要注意：函数组件必须返回一个 JSX 元素（或 null/Fragment），否则 React 会报错
function App() {
  return (
    <div className="app">
      {/* 这是 React 的 JSX 注释语法，花括号 + 块注释，注意不能直接使用 HTML 注释 */}
      <header className="app-header">
        <h1>React 博客项目</h1>
        <p>一个渐进式实战博客应用，从 JSX 到 Context 逐步构建</p>
      </header>
      <main>
        {/* 后续章节会在此添加文章列表、搜索栏、路由视图等组件 */}
        <p>项目骨架已初始化，等待添加博客功能...</p>
      </main>
      <footer className="app-footer">
        <p>基于 React 18 + Vite 构建</p>
      </footer>
    </div>
  )
}

export default App
