/**
 * ============================================================
 * 章节: React 博客项目：自定义 Hooks
 * 文件: react/runoob/40-blog-custom-hooks/example_3.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/pages/PostPage.jsx

import { useParams, Link } from 'react-router-dom'

import { usePosts } from '../hooks/usePosts'



function PostPage() {

  const { id } = useParams()

  const { isLoading, error, getArticleById } = usePosts()

  const article = getArticleById(id)



  if (isLoading) return <p className="status-msg">加载中...</p>

  if (error) return <p className="status-msg error">加载失败：{error}</p>



  if (!article) {

    return (

      <div className="not-found">

        <h2>文章不存在</h2>

        <Link to="/">返回首页</Link>

      </div>

    )

  }



  return (

    <article className="post-view">

      <span className="category-tag">{article.category}</span>

      <h1>{article.title}</h1>

      <time>{article.date}</time>

      <div className="content" dangerouslySetInnerHTML={{ __html: article.content }} />

      <Link to="/" className="back-link">← 返回首页</Link>

    </article>

  )

}



export default PostPage