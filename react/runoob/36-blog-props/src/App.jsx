/**
 * ============================================================
 * 章节: React 博客项目：Props
 * 文件: react/runoob/36-blog-props/src/App.jsx
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
import NavBar from './components/NavBar'
import ArticleList from './components/ArticleList'
import Footer from './components/Footer'

// 这是 React 的导航链接数据，通常在实际应用中来自配置文件或 API
const navLinks = [
  { id: 1, name: '首页', url: '/' },
  { id: 2, name: '文章', url: '/articles' },
  { id: 3, name: '关于', url: '/about' },
]

function App() {
  return (
    <div className="app">
      {/* 这是 React 的 Props 传递，NavBar 接收 title 和 links 两个 Props */}
      <NavBar title="React 博客" links={navLinks} />
      <main className="app-main">
        <ArticleList />
      </main>
      {/* 这是 React 的默认 Props 使用，Footer 不传递 copyright 时使用默认值 */}
      <Footer />
    </div>
  )
}

export default App
