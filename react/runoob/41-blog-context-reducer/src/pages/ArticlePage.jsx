/**
 * ============================================================
 * 章节: React 博客项目：Context + Reducer
 * 文件: react/runoob/41-blog-context-reducer/src/pages/ArticlePage.jsx
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
import { useParams, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useBlog()

  // 从全局状态查找文章，不再单独请求
  const article = state.articles.find((a) => a.id === Number(id))

  if (!article) {
    return (
      <div className="article-page">
        <h2>文章未找到</h2>
        <button onClick={() => navigate('/')}>返回首页</button>
      </div>
    )
  }

  return (
    <article className="article-page">
      <h1>{article.title}</h1>
      <time>{article.date}</time>
      <div className="article-content">
        <p>{article.summary}</p>
      </div>
      <button onClick={() => navigate(-1)}>返回</button>
    </article>
  )
}

export default ArticlePage
