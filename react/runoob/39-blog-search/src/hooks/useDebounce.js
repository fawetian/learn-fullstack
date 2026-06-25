/**
 * 39-blog-search: 简单防抖 Hook（基础版）
 * 来源章节: https://www.runoob.com/react/react-blog-search.html
 *
 * 这是 React 的 useEffect 防抖实现，作用是延迟更新值，避免频繁触发副作用。
 * 需要注意：防抖通过 setTimeout 实现，每次依赖变化时清除旧定时器，只执行最后一次。
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
