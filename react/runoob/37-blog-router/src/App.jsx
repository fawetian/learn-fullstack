/**
 * 37-blog-router: 路由根组件 App
 * 来源章节: https://www.runoob.com/react/react-blog-router.html
 *
 * 这是 React Router 的路由配置入口，作用是定义博客的所有页面路由规则。
 * 需要注意：BrowserRouter 使用 HTML5 History API，在生产环境部署到非根路径时需要配置 basename。
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
