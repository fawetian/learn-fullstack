/**
 * ============================================================
 * 章节: React 博客项目：搜索
 * 文件: react/runoob/39-blog-search/src/pages/HomePage.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
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
