/**
 * ============================================================
 * 章节: React 博客项目：Props
 * 文件: react/runoob/36-blog-props/src/components/ArticleList.jsx
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
