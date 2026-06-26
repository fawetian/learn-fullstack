/**
 * ============================================================
 * 章节: React 博客项目：自定义 Hooks
 * 文件: react/runoob/40-blog-custom-hooks/src/hooks/useFetch.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import { useState, useEffect, useCallback } from 'react'

// 这是 React 的自定义 Hook 参数设计，options 允许调用方传入 fetch 配置（如 headers、method）
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 这是 React 的 useCallback，作用是将刷新函数缓存，避免每次渲染都创建新函数
  // 需要注意：refresh 被 ArticleList 的 useEffect 或事件处理使用时，稳定的引用可以减少不必要的依赖变化
  const refresh = useCallback(() => {
    // 返回一个标志对象，用于在外层触发新的请求
    // 实际实现中，我们通过一个刷新计数器来触发 useEffect
    return Date.now()
  }, [])

  // 这是 React 的刷新计数器，当调用 refresh 时递增，触发 useEffect 重新请求
  const [refreshKey, setRefreshKey] = useState(0)

  const triggerRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1)
  }, [])

  useEffect(() => {
    // 这是 React 的请求取消控制器，防止组件卸载后更新状态导致内存泄漏
    const controller = new AbortController()

    const fetchData = async () => {
      // 如果提供了 url 才发起请求，允许调用方条件性使用
      if (!url) return

      setLoading(true)
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP 错误: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url, refreshKey]) // 依赖 url 和 refreshKey，调用 triggerRefresh 会重新请求

  // 返回数据和操作函数，供组件使用
  return { data, loading, error, refresh: triggerRefresh }
}
