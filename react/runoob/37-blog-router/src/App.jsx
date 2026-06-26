/**
 * ============================================================
 * 章节: React 博客项目：路由
 * 文件: react/runoob/37-blog-router/src/App.jsx
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
// 这是 React Router 的路由组件，作用是提供 SPA 路由功能
// 需要注意：react-router-dom v6 中 Switch 被替换为 Routes，component 被替换为 element
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'

function App() {
  return (
    // 这是 React Router 的浏览器路由模式，URL 形式为 /about、/article/1
    // 需要注意：HashRouter 使用 # 路径，不需要服务端配置；BrowserRouter 需要服务端配置回退到 index.html
    <BrowserRouter>
      <div className="app">
        <NavBar title="React 博客" />
        <main className="app-main">
          {/* 这是 React Router 的路由声明配置，Routes 会匹配第一个符合条件的 Route */}
          {/* 需要注意：Routes 取代了 v5 的 Switch，Route 的 element 属性取代了 component */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
