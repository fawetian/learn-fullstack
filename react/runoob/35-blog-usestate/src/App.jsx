/**
 * ============================================================
 * 章节: React 博客项目：useState
 * 文件: react/runoob/35-blog-usestate/src/App.jsx
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
import ArticleList from './components/ArticleList'
import Counter from './components/Counter'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React 博客</h1>
        <p>useState 响应式数据管理</p>
      </header>
      <main>
        {/* 这是 React 的组件组合，两个组件独立管理各自的状态，互不干扰 */}
        <ArticleList />
        <Counter />
      </main>
      <footer className="app-footer">
        <p>基于 React 18 + Vite 构建</p>
      </footer>
    </div>
  )
}

export default App
