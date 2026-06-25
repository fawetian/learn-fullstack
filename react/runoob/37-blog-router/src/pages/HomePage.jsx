/**
 * 37-blog-router: 首页组件
 * 来源章节: https://www.runoob.com/react/react-blog-router.html
 *
 * 这是 React Router 的页面级组件，作用是渲染博客首页内容。
 * 需要注意：页面组件（Page）通常放在 pages/ 目录，负责组合多个 UI 组件。
 */

import React from 'react'
import ArticleList from '../components/ArticleList'

function HomePage() {
  return (
    <div className="home-page">
      <h1>欢迎来到 React 博客</h1>
      <p>探索最新的 React 技术文章</p>
      <ArticleList />
    </div>
  )
}

export default HomePage
