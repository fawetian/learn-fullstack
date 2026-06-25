/**
 * 39-blog-search: 搜索栏组件
 * 来源章节: https://www.runoob.com/react/react-blog-search.html
 *
 * 这是 React 的受控组件，作用是将输入框的值绑定到 React 状态中。
 * 需要注意：受控组件的 value 由 state 控制，onChange 更新 state，实现 React 对输入的完全掌控。
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
