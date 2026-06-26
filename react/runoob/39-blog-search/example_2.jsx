/**
 * ============================================================
 * 章节: React 博客项目：搜索
 * 文件: react/runoob/39-blog-search/example_2.jsx
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



function useDebounce(value, delay = 300) {

  const [debouncedValue, setDebouncedValue] = useState(value)



  useEffect(() => {

    // 设置定时器：delay ms 后更新 debouncedValue

    const timer = setTimeout(() => {

      setDebouncedValue(value)

    }, delay)



    // 清理函数：如果 value 在 delay 内又变了，清除上一个定时器

    return () => clearTimeout(timer)

  }, [value, delay])



  return debouncedValue

}



// 使用防抖

function SearchInput() {

  const [keyword, setKeyword] = useState('')

  const debouncedKeyword = useDebounce(keyword, 300)



  // 只在防抖后的值变化时才执行（如发请求）

  useEffect(() => {

    if (debouncedKeyword) {

      console.log('真正执行搜索：', debouncedKeyword)

      // fetch(`/api/search?q=${debouncedKeyword}`)

    }

  }, [debouncedKeyword])



  return (

    <input

      value={keyword}

      onChange={e => setKeyword(e.target.value)}

      placeholder="搜索..."

    />

  )

}