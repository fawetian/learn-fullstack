/**
 * 41-blog-context-reducer: 文章详情页（Context 版）
 * 来源章节: https://www.runoob.com/react/react-blog-context-reducer.html
 */

import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useBlog()

  // 从全局状态查找文章，不再单独请求
  const article = state.articles.find((a) => a.id === Number(id))

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
      <time>{article.date}</time>
      <div className="article-content">
        <p>{article.summary}</p>
      </div>
      <button onClick={() => navigate(-1)}>返回</button>
    </article>
  )
}

export default ArticlePage
