/**
 * 36-blog-props: 文章列表组件
 * 来源章节: https://www.runoob.com/react/react-blog-props-component.html
 *
 * 这是 React 的状态管理父组件，作用是管理文章状态并通过 Props 将数据传递给 ArticleCard。
 * 需要注意：ArticleList 是"有状态组件"，ArticleCard 是"展示组件"（无状态），这是 React 常见的组件分工模式。
 */

import React, { useState } from 'react'
import ArticleCard from './ArticleCard'

const initialArticles = [
  { id: 1, title: 'React 入门指南', date: '2024-01-15', summary: '从零开始学习 React 的基础知识', likes: 12 },
  { id: 2, title: 'JSX 语法详解', date: '2024-01-20', summary: '深入理解 JSX 的编译原理和用法', likes: 8 },
  { id: 3, title: '组件化开发思想', date: '2024-02-01', summary: '如何拆分和复用 React 组件', likes: 15 },
  { id: 4, title: 'Hooks 最佳实践', date: '2024-02-10', summary: 'useState、useEffect 等 Hooks 的使用技巧', likes: 20 },
]

function ArticleList() {
  const [articles, setArticles] = useState(initialArticles)

  // 这是 React 的状态更新回调，作用是增加指定文章的点赞数
  // 需要注意：状态保留在 ArticleList 中，通过 Props 传递给 ArticleCard，这是"单向数据流"的体现
  const handleLike = (id) => {
    setArticles(
      articles.map((article) =>
        article.id === id
          ? { ...article, likes: article.likes + 1 }
          : article
      )
    )
  }

  return (
    <section className="article-list">
      <h2 className="article-list-title">最新文章</h2>
      <div className="article-grid">
        {/* 这是 React 的组件组合与 Props 传递，每个 ArticleCard 接收自己的 article 和 onLike */}
        {/* 需要注意：map 中必须提供 key，且 key 应该使用稳定唯一的标识（如 id），不要用数组索引 */}
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onLike={handleLike}
          />
        ))}
      </div>
    </section>
  )
}

export default ArticleList
