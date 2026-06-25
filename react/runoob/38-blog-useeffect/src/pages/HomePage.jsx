/**
 * 38-blog-useeffect: 首页组件
 * 来源章节: https://www.runoob.com/react/react-blog-data-fetching.html
 */

import React from 'react'
import ArticleList from '../components/ArticleList'

function HomePage() {
  return (
    <div className="home-page">
      <h1>欢迎来到 React 博客</h1>
      <p>探索最新的 React 技术文章（从 API 动态加载）</p>
      <ArticleList />
    </div>
  )
}

export default HomePage
