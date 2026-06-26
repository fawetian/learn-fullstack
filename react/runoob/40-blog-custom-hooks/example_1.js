/**
 * ============================================================
 * 章节: React 博客项目：自定义 Hooks
 * 文件: react/runoob/40-blog-custom-hooks/example_1.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/hooks/usePosts.js

import { useState, useEffect, useMemo } from 'react'



export function usePosts() {

  const [articles, setArticles] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(null)

  const [activeCategory, setActiveCategory] = useState('全部')

  const [keyword, setKeyword] = useState('')



  // 加载数据

  useEffect(() => {

    let cancelled = false

    async function fetchPosts() {

      setIsLoading(true)

      setError(null)

      try {

        const res = await fetch('/posts.json')

        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const data = await res.json()

        if (!cancelled) setArticles(data)

      } catch (err) {

        if (!cancelled) setError(err.message)

      } finally {

        if (!cancelled) setIsLoading(false)

      }

    }

    fetchPosts()

    return () => { cancelled = true }

  }, [])



  // 提取所有分类

  const categories = useMemo(() => {

    return ['全部', ...new Set(articles.map(a => a.category))]

  }, [articles])



  // 按分类 + 关键词过滤

  const filteredArticles = useMemo(() => {

    let result = articles

    if (activeCategory !== '全部') {

      result = result.filter(a => a.category === activeCategory)

    }

    if (keyword.trim()) {

      const kw = keyword.trim().toLowerCase()

      result = result.filter(a =>

        a.title.toLowerCase().includes(kw) ||

        a.summary.toLowerCase().includes(kw)

      )

    }

    return result

  }, [articles, activeCategory, keyword])



  // 根据 ID 查找文章

  function getArticleById(id) {

    return articles.find(a => a.id === Number(id))

  }



  // 重新加载

  function refetch() {

    // 触发 useEffect 的另一种方式：用 key 或增强 state

    window.location.reload()

  }



  return {

    articles, isLoading, error,

    activeCategory, setActiveCategory,

    keyword, setKeyword,

    categories,

    filteredArticles,

    getArticleById,

    refetch

  }

}