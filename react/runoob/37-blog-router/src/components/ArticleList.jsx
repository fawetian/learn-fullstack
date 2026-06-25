/**
 * 37-blog-router: 文章列表组件（路由版）
 * 来源章节: https://www.runoob.com/react/react-blog-router.html
 *
 * 这是 React Router 的文章列表组件，文章标题使用 Link 链接到详情页。
 * 需要注意：列表项使用 Link 组件代替 <a> 标签，实现无刷新导航。
 */

import React, { useState } from 'react'
// 这是 React Router 的 Link 组件，作用是以客户端路由方式跳转，不刷新页面
import { Link } from 'react-router-dom'
import ArticleCard from './ArticleCard'

const initialArticles = [
  { id: 1, title: 'React 入门指南', date: '2024-01-15', summary: '从零开始学习 React 的基础知识', likes: 12 },
  { id: 2, title: 'JSX 语法详解', date: '2024-01-20', summary: '深入理解 JSX 的编译原理和用法', likes: 8 },
  { id: 3, title: '组件化开发思想', date: '2024-02-01', summary: '如何拆分和复用 React 组件', likes: 15 },
  { id: 4, title: 'Hooks 最佳实践', date: '2024-02-10', summary: 'useState、useEffect 等 Hooks 的使用技巧', likes: 20 },
]

function ArticleList() {
  const [articles, setArticles] = useState(initialArticles)

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
        {articles.map((article) => (
          <div key={article.id}>
            <ArticleCard article={article} onLike={handleLike} />
            {/* 这是 React Router 的 Link，作用是为每篇文章提供详情页入口 */}
            {/* 需要注意：Link 的 to 属性对应 Route 的 path，如 /article/1 匹配 /article/:id */}
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
