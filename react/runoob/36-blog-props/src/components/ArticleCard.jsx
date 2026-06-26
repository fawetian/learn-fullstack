/**
 * ============================================================
 * 章节: React 博客项目：Props
 * 文件: react/runoob/36-blog-props/src/components/ArticleCard.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
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
