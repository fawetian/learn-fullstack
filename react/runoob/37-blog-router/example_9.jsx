/**
 * ============================================================
 * 章节: React 博客项目：路由
 * 文件: react/runoob/37-blog-router/example_9.jsx
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

import { useMemo } from 'react'



// 文章数据（后续章节会从外部加载）

const articles = [

  { id: 1, title: 'React 入门完全指南', category: 'React', date: '2024-05-10',

    content: '<h2>为什么学 React？</h2><p>React 是目前最流行的前端框架之一...</p>' },

  { id: 2, title: 'JS 异步编程详解', category: 'JavaScript', date: '2024-05-08',

    content: '<h2>什么是异步？</h2><p>JS 是单线程的...</p>' },

]



function PostPage() {

  const { id } = useParams()



  // 根据 ID 查找文章

  const article = useMemo(() => {

    return articles.find(a => a.id === Number(id))

  }, [id])



  // 文章不存在

  if (!article) {

    return (

      <div className="not-found">

        <h2>文章不存在</h2>

        <p>找不到 ID 为 {id} 的文章</p>

        <Link to="/">返回首页</Link>

      </div>

    )

  }



  // 文章存在

  return (

    <article className="post-view">

      <span className="category-tag">{article.category}</span>

      <h1>{article.title}</h1>

      <time>{article.date}</time>

      {/* dangerouslySetInnerHTML 等价于 Vue 的 v-html，注意 XSS 风险 */}

      <div

        className="content"

        dangerouslySetInnerHTML={{ __html: article.content }}

      />

      <Link to="/" className="back-link">← 返回首页</Link>

    </article>

  )

}



export default PostPage