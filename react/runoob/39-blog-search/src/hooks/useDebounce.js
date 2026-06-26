/**
 * ============================================================
 * 章节: React 博客项目：搜索
 * 文件: react/runoob/39-blog-search/src/hooks/useDebounce.js
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

// 这是 React 的自定义 Hook，作用是将输入值延迟 delay 毫秒后输出
// 需要注意：delay 默认 500ms，适合搜索场景，过短会导致请求过于频繁
export function useDebounce(value, delay = 500) {
  // 这是 React 的防抖状态，存储延迟后的值
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 这是 React 的定时器设置，作用是在 delay 毫秒后更新 debouncedValue
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 这是 React 的 useEffect 清理函数，作用是在 value 变化时清除上一次的定时器
    // 需要注意：如果不清除定时器，每次输入都会触发一次更新，就失去了防抖的意义
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay]) // 这是 React 的依赖数组，value 或 delay 变化时重新设置定时器

  return debouncedValue
}
