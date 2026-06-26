/**
 * ============================================================
 * 章节: React 博客项目：搜索
 * 文件: react/runoob/39-blog-search/example_1.jsx
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



function SearchDemo() {

  const [keyword, setKeyword] = useState('')

  const [results, setResults] = useState([])



  // 每当 keyword 变化时，重新执行过滤

  useEffect(() => {

    console.log('keyword 变为：', keyword)

    // 这里可以执行搜索逻辑

    setResults(/* 过滤结果 */)

  }, [keyword])  // 依赖 keyword



  return (

    <div>

      <input

        value={keyword}

        onChange={e => setKeyword(e.target.value)}

        placeholder="搜索..."

      />

      <p>当前搜索：{keyword}</p>

    </div>

  )

}