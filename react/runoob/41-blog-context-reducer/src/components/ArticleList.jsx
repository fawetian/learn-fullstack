/**
 * ============================================================
 * 章节: React 博客项目：Context + Reducer
 * 文件: react/runoob/41-blog-context-reducer/src/components/ArticleList.jsx
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
