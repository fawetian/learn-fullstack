/**
 * 41-blog-context-reducer: 搜索栏组件（Context 版）
 * 来源章节: https://www.runoob.com/react/react-blog-context-reducer.html
 */

import React from 'react'
import { useBlog } from '../context/BlogContext'

function SearchBar() {
  const { state, dispatch } = useBlog()

  const handleChange = (e) => {
    // 这是 React 的 Context dispatch，直接通过 dispatch 更新全局搜索关键词
    dispatch({ type: 'SET_SEARCH_KEYWORD', payload: e.target.value })
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="搜索文章..."
        value={state.searchKeyword}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
