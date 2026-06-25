/**
 * 37-blog-router: 文章详情页
 * 来源章节: https://www.runoob.com/react/react-blog-router.html
 *
 * 这是 React Router 的动态路由页面，作用是展示单篇文章的详细内容。
 * 需要注意：useParams 获取 URL 参数，useNavigate 用于编程式导航（如返回首页）。
 */

import React from 'react'
// 这是 React Router 的 Hooks，useParams 获取路由参数，useNavigate 用于编程式跳转
import { useParams, useNavigate } from 'react-router-dom'

// 模拟文章数据，实际应用中会使用 API 获取（参见 38-blog-useeffect）
const articlesData = [
  { id: 1, title: 'React 入门指南', content: 'React 是用于构建用户界面的 JavaScript 库...' },
  { id: 2, title: 'JSX 语法详解', content: 'JSX 是 JavaScript 的语法扩展，允许在 JS 中编写 HTML...' },
  { id: 3, title: '组件化开发思想', content: '组件化是 React 的核心理念，将 UI 拆分为独立、可复用的部分...' },
  { id: 4, title: 'Hooks 最佳实践', content: 'Hooks 让你在不编写 class 的情况下使用 state 和其他 React 特性...' },
]

function ArticlePage() {
  // 这是 React Router 的 useParams Hook，作用是从 URL 中提取动态参数
  // 需要注意：useParams 返回的对象属性名与 Route 的 path 定义一致（如 :id）
  const { id } = useParams()
  // 这是 React Router 的导航 Hook，作用是以编程方式跳转页面
  const navigate = useNavigate()

  // 这是 React 的数据查询逻辑，根据 URL 参数查找对应文章
  const article = articlesData.find((a) => a.id === Number(id))

  if (!article) {
    return (
      <div className="article-page">
        <h2>文章未找到</h2>
        <button onClick={() => navigate('/')}>返回首页</button>
      </div>
    )
  }

  return (
    <article className="article-page">
      <h1>{article.title}</h1>
      <div className="article-content">
        <p>{article.content}</p>
      </div>
      <button onClick={() => navigate(-1)}>返回</button>
    </article>
  )
}

export default ArticlePage
