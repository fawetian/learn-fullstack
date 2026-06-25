/**
 * 35-blog-usestate: 根组件 App
 * 来源章节: https://www.runoob.com/react/react-blog-state-management.html
 *
 * 这是 React 的根组件，作用是展示 useState 的两种典型用法：简单计数器和列表状态。
 * 需要注意：每个组件有自己的状态，状态隔离是组件化的重要特性。
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
