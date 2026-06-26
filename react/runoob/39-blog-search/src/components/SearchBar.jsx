/**
 * ============================================================
 * 章节: React 博客项目：搜索
 * 文件: react/runoob/39-blog-search/src/components/SearchBar.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import React, { useState } from 'react'

// 这是 React 的 Props 接收组件，接收 onSearch 回调函数通知父组件搜索关键词变化
function SearchBar({ onSearch }) {
  // 这是 React 的输入状态，绑定到输入框的 value 属性
  const [keyword, setKeyword] = useState('')

  // 这是 React 的输入变化处理函数，作用是更新本地状态并通知父组件
  const handleChange = (e) => {
    const value = e.target.value
    setKeyword(value)
    // 这是 React 的父组件通知机制，将输入值实时传递给父组件
    // 需要注意：这里传递的是实时值，父组件可以自行决定是否使用防抖
    onSearch(value)
  }

  return (
    <div className="search-bar">
      {/* 这是 React 的受控输入框，value 由 state 控制，onChange 更新 state */}
      {/* 需要注意：如果不设置 value，输入框会变成非受控组件，React 无法管理其值 */}
      <input
        type="text"
        placeholder="搜索文章..."
        value={keyword}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
