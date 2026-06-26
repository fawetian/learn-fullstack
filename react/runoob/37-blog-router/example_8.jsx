/**
 * ============================================================
 * 章节: React 博客项目：路由
 * 文件: react/runoob/37-blog-router/example_8.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/pages/HomePage.jsx

import { useState, useMemo } from 'react'

import BlogCard from '../components/BlogCard'

import CategoryFilter from '../components/CategoryFilter'



function HomePage() {

  const [articles] = useState([

    { id: 1, title: 'React 入门完全指南', summary: '从零学 React', category: 'React', date: '2024-05-10',

      content: '<h2>为什么学 React？</h2><p>React 是目前最流行的前端框架之一...</p>' },

    { id: 2, title: 'JS 异步编程详解', summary: '搞懂 Promise 和 async/await', category: 'JavaScript', date: '2024-05-08',

      content: '<h2>什么是异步？</h2><p>JS 是单线程的，异步操作可以让主线程不阻塞...</p>' },

    { id: 3, title: 'CSS Grid 布局实战', summary: '用 Grid 实现响应式布局', category: 'CSS', date: '2024-05-05',

      content: '<h2>Grid 入门</h2><p>Grid 是二维布局系统...</p>' },

  ])



  const [activeCategory, setActiveCategory] = useState('全部')



  const categories = useMemo(() => {

    return ['全部', ...new Set(articles.map(a => a.category))]

  }, [articles])



  const filteredArticles = useMemo(() => {

    if (activeCategory === '全部') return articles

    return articles.filter(a => a.category === activeCategory)

  }, [articles, activeCategory])



  return (

    <div>

      <h2 className="section-title">最新文章</h2>

      <CategoryFilter

        categories={categories}

        activeCategory={activeCategory}

        onCategoryChange={setActiveCategory}

      />

      <p className="result-info">共 {filteredArticles.length} 篇</p>

      {filteredArticles.length === 0 ? (

        <p className="empty-tip">该分类下暂无文章</p>

      ) : (

        <div className="article-grid">

          {filteredArticles.map(article => (

            <BlogCard key={article.id} {...article} />

          ))}

        </div>

      )}

    </div>

  )

}



export default HomePage