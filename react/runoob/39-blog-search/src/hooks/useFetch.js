/**
 * ============================================================
 * 章节: React 博客项目：搜索
 * 文件: react/runoob/39-blog-search/src/hooks/useFetch.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import { useState, useEffect } from 'react'

// 这是 React 的自定义 Hook（基础版），作用是将数据请求逻辑封装为可复用的 Hook
// 需要注意：自定义 Hook 必须以 use 开头，否则 React 不会将其识别为 Hook 并检查规则
export function useFetch(url) {
  // 这是 React 的数据状态，存储请求返回的数据
  const [data, setData] = useState(null)
  // 这是 React 的加载状态，用于在请求期间显示 Loading 指示器
  const [loading, setLoading] = useState(true)
  // 这是 React 的错误状态，用于捕获和展示请求错误
  const [error, setError] = useState(null)

  useEffect(() => {
    // 这是 React 的请求取消控制器，作用是在组件卸载时取消未完成的请求
    // 需要注意：AbortController 是浏览器原生 API，fetch 的 signal 参数与之配合使用
    const controller = new AbortController()

    // 这是 React 的异步数据请求函数，定义后立即调用
    // 需要注意：不能在 useEffect 回调前直接加 async，但可以在内部定义 async 函数
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url, { signal: controller.signal })

        // 这是 React 的 HTTP 错误处理，fetch 不会自动抛出 4xx/5xx 错误，需要手动检查
        if (!response.ok) {
          throw new Error(`HTTP 错误: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        // 这是 React 的请求取消判断，AbortError 不需要展示给用户
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // 这是 React 的 useEffect 清理函数，作用是在组件卸载或依赖变化前取消请求
    // 需要注意：清理函数可以防止组件卸载后调用 setState 导致的内存泄漏警告
    return () => {
      controller.abort()
    }
  }, [url]) // 这是 React 的依赖数组，url 变化时重新请求数据

  // 返回数据、加载状态和错误信息，供组件使用
  return { data, loading, error }
}
