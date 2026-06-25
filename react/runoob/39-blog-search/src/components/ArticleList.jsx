/**
 * 39-blog-search: 文章列表组件（搜索过滤版）
 * 来源章节: https://www.runoob.com/react/react-blog-search.html
 *
 * 这是 React 的搜索过滤组件，作用是将搜索关键词与文章列表结合，实现实时过滤。
 * 需要注意：过滤逻辑在组件内完成，搜索状态由父组件管理并传入。
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useDebounce } from '../hooks/useDebounce'
import ArticleCard from './ArticleCard'

function ArticleList({ searchKeyword }) {
  // 这是 React 的防抖 Hook 调用，作用是将实时输入延迟 500ms 后再用于过滤
  // 需要注意：debouncedKeyword 变化比 searchKeyword 慢 delay 毫秒，避免频繁过滤
  const debouncedKeyword = useDebounce(searchKeyword, 500)

  const { data: articles, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10')

  if (loading) return <div className="loading">加载中...</div>
  if (error) return <div className="error">加载失败: {error}</div>

  // 这是 React 的搜索过滤逻辑，根据 debouncedKeyword 过滤文章列表
  // 需要注意：使用 toLowerCase 实现不区分大小写的搜索，提升用户体验
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
      {/* 这是 React 的空状态渲染，当过滤结果为空时展示提示 */}
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
