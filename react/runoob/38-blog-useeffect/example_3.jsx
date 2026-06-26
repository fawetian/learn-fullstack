/**
 * ============================================================
 * 章节: React 博客项目：useEffect
 * 文件: react/runoob/38-blog-useeffect/example_3.jsx
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

import { useState, useEffect, useMemo } from 'react'

import BlogCard from '../components/BlogCard'

import CategoryFilter from '../components/CategoryFilter'



function HomePage() {

  const [articles, setArticles] = useState([])   // 文章数据

  const [isLoading, setIsLoading] = useState(true) // 加载状态

  const [error, setError] = useState(null)        // 错误信息

  const [activeCategory, setActiveCategory] = useState('全部')



  // useEffect 加载数据：空依赖数组 = 仅在首次渲染后执行一次

  useEffect(() => {

    let cancelled = false  // 防止组件卸载后 setState 的标记



    async function fetchPosts() {

      setIsLoading(true)

      setError(null)

      try {

        const res = await fetch('/posts.json')

        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const data = await res.json()

        if (!cancelled) {

          setArticles(data)

        }

      } catch (err) {

        if (!cancelled) {

          setError(err.message)

        }

      } finally {

        if (!cancelled) {

          setIsLoading(false)

        }

      }

    }



    fetchPosts()



    // 清理函数：组件卸载时将 cancelled 设为 true

    return () => { cancelled = true }

  }, [])



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



      {/* 加载中 */}

      {isLoading && <p className="status-msg">加载中，请稍候...</p>}



      {/* 加载出错 */}

      {error && (

        <div className="status-msg error">

          <p>加载失败：{error}</p>

          <button onClick={() => window.location.reload()}>重试</button>

        </div>

      )}



      {/* 数据加载完成 */}

      {!isLoading && !error && (

        <>

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

        </>

      )}

    </div>

  )

}



export default HomePage