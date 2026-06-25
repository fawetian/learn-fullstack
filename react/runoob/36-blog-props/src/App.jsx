/**
 * 36-blog-props: 根组件 App
 * 来源章节: https://www.runoob.com/react/react-blog-props-component.html
 *
 * 这是 React 的组合式根组件，作用是将 NavBar、ArticleList、Footer 组合成完整页面。
 * 需要注意：App 组件本身可以是无状态的，只负责布局和组合子组件，这是容器组件（Container）的职责。
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
