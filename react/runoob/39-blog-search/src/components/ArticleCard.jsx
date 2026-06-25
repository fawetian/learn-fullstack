/**
 * 38-blog-useeffect: 文章卡片组件
 * 来源章节: https://www.runoob.com/react/react-blog-data-fetching.html
 */

import React from 'react'

function ArticleCard({ article, onLike }) {
  return (
    <article className="article-card">
      <h3 className="article-card-title">{article.title}</h3>
      <time className="article-card-date">{article.date}</time>
      <p className="article-card-summary">{article.summary}</p>
      <div className="article-card-actions">
        <button className="article-like-btn" onClick={() => onLike(article.id)}>
          点赞 ({article.likes})
        </button>
      </div>
    </article>
  )
}

export default ArticleCard
