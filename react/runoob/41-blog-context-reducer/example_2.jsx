/**
 * ============================================================
 * 章节: React 博客项目：Context + Reducer
 * 文件: react/runoob/41-blog-context-reducer/example_2.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import { useReducer } from 'react'



// reducer 函数：(当前状态, action) ⇒ 新状态

function favoriteReducer(state, action) {

  switch (action.type) {

    case 'TOGGLE':

      // 如果已收藏则取消，未收藏则添加

      if (state.includes(action.id)) {

        return state.filter(id => id !== action.id)

      } else {

        return [...state, action.id]

      }

    case 'CLEAR':

      return []

    default:

      return state

  }

}



function FavoriteDemo() {

  // useReducer(reducer, 初始值)

  const [favoriteIds, dispatch] = useReducer(favoriteReducer, [])



  return (

    <div>

      <p>收藏数量：{favoriteIds.length}</p>

      <button onClick={() => dispatch({ type: 'TOGGLE', id: 1 })}>

        {favoriteIds.includes(1) ? '取消收藏 1' : '收藏 1'}

      </button>

      <button onClick={() => dispatch({ type: 'CLEAR' })}>清空收藏</button>

    </div>

  )

}