/**
 * 35-blog-usestate: 文章列表组件（带状态）
 * 来源章节: https://www.runoob.com/react/react-blog-state-management.html
 *
 * 这是 React 的 useState 列表状态组件，作用是为每篇文章添加点赞状态。
 * 需要注意：在列表中管理状态时，每个 item 的状态应该与 item 的数据模型绑定，而不是独立管理。
 */

import React, { useState } from 'react'

// 这是 React 的模拟数据，包含了每篇文章的初始点赞数
const initialArticles = [
  { id: 1, title: 'React 入门指南', date: '2024-01-15', summary: '从零开始学习 React 的基础知识', likes: 12 },
  { id: 2, title: 'JSX 语法详解', date: '2024-01-20', summary: '深入理解 JSX 的编译原理和用法', likes: 8 },
  { id: 3, title: '组件化开发思想', date: '2024-02-01', summary: '如何拆分和复用 React 组件', likes: 15 },
  { id: 4, title: 'Hooks 最佳实践', date: '2024-02-10', summary: 'useState、useEffect 等 Hooks 的使用技巧', likes: 20 },
]

function ArticleList() {
  // 这是 React 的 useState 列表状态，作用是将文章数据提升到组件状态中
  // 需要注意：状态数组的更新必须创建新数组，不能原地修改（如 articles[0].likes++），否则不会触发重新渲染
  const [articles, setArticles] = useState(initialArticles)

  // 这是 React 的列表状态更新函数，作用是增加指定文章的点赞数
  // 需要注意：使用 map 创建新数组，并返回新对象，确保状态引用变化，React 才能检测到更新
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
      <ul className="article-items">
        {articles.map((article) => (
          <li key={article.id} className="article-item">
            <h3 className="article-title">{article.title}</h3>
            <time className="article-date">{article.date}</time>
            <p className="article-summary">{article.summary}</p>
            <div className="article-actions">
              {/* 这是 React 的事件处理函数传参方式，使用箭头函数包裹以传递参数 */}
              {/* 需要注意：不能写成 onClick={handleLike(article.id)}，这会在渲染时立即执行 */}
              <button onClick={() => handleLike(article.id)}>
                点赞 ({article.likes})
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ArticleList
