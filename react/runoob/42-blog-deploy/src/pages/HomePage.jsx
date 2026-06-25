/**
 * 41-blog-context-reducer: 首页组件（Context 版）
 * 来源章节: https://www.runoob.com/react/react-blog-context-reducer.html
 */

import React from 'react'
import SearchBar from '../components/SearchBar'
import ArticleList from '../components/ArticleList'

function HomePage() {
  return (
    <div className="home-page">
      <h1>欢迎来到 React 博客</h1>
      <p>全局状态管理（Context + useReducer）</p>
      <SearchBar />
      <ArticleList />
    </div>
  )
}

export default HomePage
