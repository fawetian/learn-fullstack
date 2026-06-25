/**
 * 40-blog-custom-hooks: 完整版防抖 Hook
 * 来源章节: https://www.runoob.com/react/react-blog-custom-hooks.html
 *
 * 这是 React 的自定义防抖 Hook，作用是将高频变化的值延迟为低频稳定的值。
 * 需要注意：delay 的默认值应根据场景调整，搜索建议 300-500ms，窗口 resize 建议 100-200ms。
 */

import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

// 这是 React 的带立即执行选项的防抖 Hook，作用是在首次输入时立即执行一次
// 需要注意：immediate 为 true 时，第一次输入不延迟，后续输入仍防抖
export function useDebounceWithImmediate(value, delay = 500, immediate = false) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    if (immediate && debouncedValue === value) {
      // 首次立即执行，无需额外处理
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay, immediate])

  return debouncedValue
}
