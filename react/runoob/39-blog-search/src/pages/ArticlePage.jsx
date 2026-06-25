/**
 * 38-blog-useeffect: 文章详情页
 * 来源章节: https://www.runoob.com/react/react-blog-data-fetching.html
 */

import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: article, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )

  if (loading) return <div className="loading">加载中...</div>
  if (error) return <div className="error">加载失败: {error}</div>
  if (!article) return <div className="error">文章未找到</div>

  return (
    <article className="article-page">
      <h1>{article.title}</h1>
      <div className="article-content">
        <p>{article.body}</p>
      </div>
      <button onClick={() => navigate(-1)}>返回</button>
    </article>
  )
}

export default ArticlePage
