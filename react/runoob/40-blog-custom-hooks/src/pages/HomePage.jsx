/**
 * 39-blog-search: 首页组件（搜索版）
 * 来源章节: https://www.runoob.com/react/react-blog-search.html
 *
 * 这是 React 的状态提升示例，搜索关键词状态在 HomePage 中管理，通过 Props 传递给 SearchBar 和 ArticleList。
 * 需要注意：当多个子组件需要共享状态时，应将状态提升到它们的最近共同祖先组件中。
 */

import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ArticleList from '../components/ArticleList'

function HomePage() {
  // 这是 React 的状态提升，搜索关键词在 HomePage 中管理，供 SearchBar 和 ArticleList 共享
  const [searchKeyword, setSearchKeyword] = useState('')

  return (
    <div className="home-page">
      <h1>欢迎来到 React 博客</h1>
      <p>输入关键词搜索文章</p>
      {/* 这是 React 的 Props 传递，SearchBar 通过 onSearch 回调更新 HomePage 的状态 */}
      <SearchBar onSearch={setSearchKeyword} />
      {/* 这是 React 的 Props 传递，ArticleList 接收搜索关键词进行过滤 */}
      <ArticleList searchKeyword={searchKeyword} />
    </div>
  )
}

export default HomePage
