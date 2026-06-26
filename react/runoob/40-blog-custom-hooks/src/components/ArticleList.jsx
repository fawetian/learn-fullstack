/**
 * ============================================================
 * 章节: React 博客项目：自定义 Hooks
 * 文件: react/runoob/40-blog-custom-hooks/src/components/ArticleList.jsx
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
// 这是 React 的自定义 Hook 导入，命名必须以 use 开头，表明这是 Hook 而非普通工具函数
import { useFetch } from '../hooks/useFetch'
import { useDebounce } from '../hooks/useDebounce'
import ArticleCard from './ArticleCard'

function ArticleList({ searchKeyword }) {
  // 这是 React 的自定义 Hook 调用，useDebounce 将高频输入转为低频稳定值
  const debouncedKeyword = useDebounce(searchKeyword, 500)

  // 这是 React 的自定义 Hook 调用，useFetch 封装了数据请求、加载状态、错误处理全部逻辑
  // 需要注意：useFetch 内部使用 useEffect，所以数据请求是异步的，首次渲染时 data 可能为 null
  const { data: articles, loading, error, refresh } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10')

  if (loading) return <div className="loading">加载中...</div>
  if (error) return <div className="error">加载失败: {error} <button onClick={refresh}>重试</button></div>

  const filteredArticles = debouncedKeyword
    ? articles.filter((post) =>
        post.title.toLowerCase().includes(debouncedKeyword.toLowerCase())
      )
    : articles

  const mappedArticles = filteredArticles.map((post) => ({
    id: post.id,
    title: post.title,
    date: '2024-03-01',
    summary: post.body.substring(0, 60) + '...',
    likes: 0,
  }))

  return (
    <section className="article-list">
      <h2 className="article-list-title">
        {debouncedKeyword ? `搜索 "${debouncedKeyword}" 的结果` : '最新文章'}
      </h2>
      {mappedArticles.length === 0 ? (
        <p className="empty-result">未找到匹配的文章</p>
      ) : (
        <div className="article-grid">
          {mappedArticles.map((article) => (
            <div key={article.id}>
              <ArticleCard article={article} onLike={() => {}} />
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
