/**
 * ============================================================
 * 章节: React 博客项目：Context + Reducer
 * 文件: react/runoob/41-blog-context-reducer/src/context/BlogContext.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { blogReducer, initialState } from '../reducers/blogReducer'

// 这是 React 的 Context 创建，createContext 接收默认值，用于类型提示和降级场景
// 需要注意：context 本身不存储状态，状态存储在 Provider 的 value 中
const BlogContext = createContext(null)

// 这是 React 的自定义 Hook，作用是简化 useContext 调用，并在未包裹 Provider 时抛错
// 需要注意：自定义 Hook 封装 useContext 是最佳实践，避免组件中重复写 useContext(BlogContext)
export function useBlog() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog 必须在 BlogProvider 内部使用')
  }
  return context
}

// 这是 React 的 Provider 组件，作用是将 state 和 dispatch 提供给所有子组件
// 需要注意：Provider 的 value 变化时，所有消费该 Context 的组件都会重新渲染
export function BlogProvider({ children }) {
  // 这是 React 的 useReducer Hook，作用是将复杂状态管理委托给 reducer 函数
  // 与 useState 的区别：useReducer 适合状态逻辑复杂或包含多个子值的情况
  const [state, dispatch] = useReducer(blogReducer, initialState)

  // 这是 React 的全局数据请求，在 Provider 挂载时获取文章数据
  // 需要注意：Context 中的副作用应在 Provider 组件内处理，而不是 reducer 中
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true })

    const fetchArticles = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        if (!response.ok) throw new Error(`HTTP 错误: ${response.status}`)
        const data = await response.json()

        // 将 API 数据映射为应用需要的格式
        const mapped = data.map((post) => ({
          id: post.id,
          title: post.title,
          date: '2024-03-01',
          summary: post.body.substring(0, 60) + '...',
          likes: 0,
        }))

        dispatch({ type: 'SET_ARTICLES', payload: mapped })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message })
      }
    }

    fetchArticles()
  }, []) // 空依赖数组，只在 Provider 挂载时执行一次

  // 这是 React 的 Context Value 对象，包含 state 和 dispatch，供子组件使用
  // 需要注意：每次渲染都会创建新对象，如果性能敏感应使用 useMemo 缓存
  const value = { state, dispatch }

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}
