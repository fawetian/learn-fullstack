/**
 * ============================================================
 * 章节: React 博客项目：Props
 * 文件: react/runoob/36-blog-props/example_7.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/App.jsx

import { useState, useMemo } from 'react'

import NavBar from './components/NavBar'

import BlogCard from './components/BlogCard'

import CategoryFilter from './components/CategoryFilter'

import './App.css'



function App() {

  const [articles] = useState([

    { id: 1, title: 'React 入门完全指南', summary: '从零开始学习 React Hooks', date: '2024-05-10', category: 'React' },

    { id: 2, title: 'JS 异步编程详解', summary: '搞懂 Promise 和 async/await', date: '2024-05-08', category: 'JavaScript' },

    { id: 3, title: 'CSS Grid 布局实战', summary: '用 Grid 实现响应式布局', date: '2024-05-05', category: 'CSS' },

    { id: 4, title: 'React Hooks 深入', summary: '深入理解 useState 和 useEffect', date: '2024-05-03', category: 'React' },

    { id: 5, title: 'Flexbox 完全指南', summary: '一文学会弹性布局', date: '2024-05-01', category: 'CSS' },

  ])



  const [activeCategory, setActiveCategory] = useState('全部')



  const categories = useMemo(() => {

    const cats = articles.map(a => a.category)

    return ['全部', ...new Set(cats)]

  }, [articles])



  const filteredArticles = useMemo(() => {

    if (activeCategory === '全部') return articles

    return articles.filter(a => a.category === activeCategory)

  }, [articles, activeCategory])



  return (

    <div className="app">

      <NavBar />



      <main className="container">

        <h2 className="section-title">最新文章</h2>



        {/* 子组件：接收 props（categories, activeCategory）和回调（onCategoryChange） */}

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

              <BlogCard

                key={article.id}

                title={article.title}

                summary={article.summary}

                date={article.date}

                category={article.category}

              />

            ))}

          </div>

        )}

      </main>



      <footer className="footer">

        <p>© 2024 RUNOOB Blog. Powered by React.</p>

      </footer>

    </div>

  )

}



export default App