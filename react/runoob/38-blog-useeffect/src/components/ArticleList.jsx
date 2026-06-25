/**
 * 38-blog-useeffect: 文章列表组件（数据请求版）
 * 来源章节: https://www.runoob.com/react/react-blog-data-fetching.html
 *
 * 这是 React 的 useEffect 数据请求组件，作用是从远程 API 获取文章数据并渲染。
 * 需要注意：useEffect 在组件渲染完成后执行，所以首次渲染时数据可能为空，需要处理加载状态。
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import ArticleCard from './ArticleCard'

function ArticleList() {
  // 这是 React 的自定义 Hook 调用，作用是从 API 获取文章列表
  // 需要注意：由于 useFetch 内部使用 useEffect，数据请求在组件挂载后发起，首次渲染时 data 为 null
  const { data: articles, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=4')

  // 这是 React 的加载状态渲染，在数据请求期间展示 Loading 提示
  // 需要注意：条件渲染应该在 JSX 最外层处理，避免返回 undefined
  if (loading) {
    return <div className="loading">加载中...</div>
  }

  // 这是 React 的错误状态渲染，在请求失败时展示错误信息
  if (error) {
    return <div className="error">加载失败: {error}</div>
  }

  // 将 API 数据转换为组件需要的格式（jsonplaceholder 的字段名不同）
  const mappedArticles = articles.map((post) => ({
    id: post.id,
    title: post.title,
    date: '2024-03-01',
    summary: post.body.substring(0, 60) + '...',
    likes: 0,
  }))

  return (
    <section className="article-list">
      <h2 className="article-list-title">最新文章</h2>
      <div className="article-grid">
        {mappedArticles.map((article) => (
          <div key={article.id}>
            <ArticleCard article={article} onLike={() => {}} />
            <Link to={`/article/${article.id}`} className="article-read-more">
              阅读全文
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ArticleList
