/**
 * 40-blog-custom-hooks: 文章列表组件（自定义 Hook 版）
 * 来源章节: https://www.runoob.com/react/react-blog-custom-hooks.html
 *
 * 这是 React 的自定义 Hook 使用示例，组件只关注 UI 渲染，逻辑全部委托给 useFetch 和 useDebounce。
 * 需要注意：自定义 Hook 让组件代码更简洁，同时保持逻辑的可复用性和可测试性。
 */

import React from 'react'
import { Link } from 'react-router-dom'
// 这是 React 的自定义 Hook 导入，命名必须以 use 开头，表明这是 Hook 而非普通工具函数
import { useFetch } from '../hooks/useFetch'
import { useDebounce } from '../hooks/useDebounce'
import ArticleCard from './ArticleCard'

function ArticleList({ searchKeyword }) {
  // 这是 React 的自定义 Hook 调用，useDebounce 将高频输入转为低频稳定值
  const debouncedKeyword = useDebounce(searchKeyword, 500)

  // 这是 React 的自定义 Hook 调用，useFetch 封装了数据请求、加载状态、错误处理全部逻辑
  // 需要注意：useFetch 内部使用 useEffect，所以数据请求是异步的，首次渲染时 data 可能为 null
  const { data: articles, loading, error, refresh } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10')

  if (loading) return <div className="loading">加载中...</div>
  if (error) return <div className="error">加载失败: {error} <button onClick={refresh}>重试</button></div>

  const filteredArticles = debouncedKeyword
    ? articles.filter((post) =>
        post.title.toLowerCase().includes(debouncedKeyword.toLowerCase())
      )
    : articles

  const mappedArticles = filteredArticles.map((post) => ({
    id: post.id,
    title: post.title,
    date: '2024-03-01',
    summary: post.body.substring(0, 60) + '...',
    likes: 0,
  }))

  return (
    <section className="article-list">
      <h2 className="article-list-title">
        {debouncedKeyword ? `搜索 "${debouncedKeyword}" 的结果` : '最新文章'}
      </h2>
      {mappedArticles.length === 0 ? (
        <p className="empty-result">未找到匹配的文章</p>
      ) : (
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
      )}
    </section>
  )
}

export default ArticleList
