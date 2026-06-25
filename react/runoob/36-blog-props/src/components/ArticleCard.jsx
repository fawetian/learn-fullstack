/**
 * 36-blog-props: 文章卡片组件
 * 来源章节: https://www.runoob.com/react/react-blog-props-component.html
 *
 * 这是 React 的 Props 子组件，作用是展示单篇文章的卡片视图。
 * 需要注意：将 onLike 回调函数通过 Props 传递，让父组件管理状态，子组件只负责触发事件。
 */

import React from 'react'

// 这是 React 的 Props 回调组件，接收 article 数据对象和 onLike 回调函数
// 需要注意：Props 的命名约定——数据用名词（article），回调用 on + 动词（onLike）
function ArticleCard({ article, onLike }) {
  return (
    <article className="article-card">
      <h3 className="article-card-title">{article.title}</h3>
      <time className="article-card-date">{article.date}</time>
      <p className="article-card-summary">{article.summary}</p>
      <div className="article-card-actions">
        {/* 这是 React 的回调触发方式，子组件调用父组件传入的 onLike 函数，并传递 article.id */}
        {/* 需要注意：子组件不直接修改点赞数，而是通知父组件"我要点赞"，由父组件更新状态 */}
        <button
          className="article-like-btn"
          onClick={() => onLike(article.id)}
        >
          点赞 ({article.likes})
        </button>
      </div>
    </article>
  )
}

export default ArticleCard
