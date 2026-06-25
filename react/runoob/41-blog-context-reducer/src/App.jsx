/**
 * 41-blog-context-reducer: 根组件 App（Context 版）
 * 来源章节: https://www.runoob.com/react/react-blog-context-reducer.html
 *
 * 这是 React 的 Context Provider 包裹示例，BlogProvider 包裹整个应用，让所有子组件都能访问全局状态。
 * 需要注意：Provider 应包裹在 BrowserRouter 内部或外部都可以，但通常将 Router 放在最外层或 Provider 内层。
 */

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// 这是 React 的全局状态 Provider，作用是为整个应用提供共享状态
import { BlogProvider } from './context/BlogContext'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      {/* 这是 React 的 Context Provider 包裹，BlogProvider 内部的所有组件都能通过 useBlog 访问全局状态 */}
      <BlogProvider>
        <div className="app">
          <NavBar title="React 博客" />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BlogProvider>
    </BrowserRouter>
  )
}

export default App
