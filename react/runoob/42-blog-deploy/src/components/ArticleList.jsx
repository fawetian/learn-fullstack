/**
 * 41-blog-context-reducer: 文章列表组件（Context 版）
 * 来源章节: https://www.runoob.com/react/react-blog-context-reducer.html
 *
 * 这是 React 的 Context 消费组件，通过 useBlog 获取全局状态和 dispatch。
 * 需要注意：Context 消费组件在 Context 值变化时会重新渲染，应避免在 Context 中放置频繁变化的大对象。
 */

import React from 'react'
import { Link } from 'react-router-dom'
// 这是 React 的自定义 Context Hook，作用是从全局 BlogContext 中获取状态和方法
import { useBlog } from '../context/BlogContext'
import ArticleCard from './ArticleCard'

function ArticleList() {
  // 这是 React 的 Context 消费，从全局状态中获取文章列表、搜索关键词、加载和错误状态
  // 需要注意：useBlog 内部封装了 useContext，如果未包裹 BlogProvider 会抛出错误提示
  const { state, dispatch } = useBlog()
  const { articles, searchKeyword, loading, error } = state

  if (loading) return <div className="loading">加载中...</div>
  if (error) return <div className="error">加载失败: {error}</div>

  // 这是 React 的搜索过滤逻辑，使用全局状态中的 searchKeyword 过滤文章
  const filteredArticles = searchKeyword
    ? articles.filter((article) =>
        article.title.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : articles

  return (
    <section className="article-list">
      <h2 className="article-list-title">
        {searchKeyword ? `搜索 "${searchKeyword}" 的结果` : '最新文章'}
      </h2>
      {filteredArticles.length === 0 ? (
        <p className="empty-result">未找到匹配的文章</p>
      ) : (
        <div className="article-grid">
          {filteredArticles.map((article) => (
            <div key={article.id}>
              <ArticleCard
                article={article}
                // 这是 React 的 Context dispatch 调用，子组件通过 dispatch 通知全局状态更新
                onLike={(id) => dispatch({ type: 'LIKE_ARTICLE', payload: id })}
              />
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
