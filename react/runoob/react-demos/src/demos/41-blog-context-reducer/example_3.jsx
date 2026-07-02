/**
 * 章节: 博客·Context/Reducer
 * 来源: 41-blog-context-reducer/example_3.jsx —— ⚠️ 定义的是 Context/Provider/自定义 hook 工具模块（FavoriteProvider 渲染 children，单独无内容）
 */
export const title = "博客·Context/Reducer · example_3 (源码展示)";
export const sourceFile = "41-blog-context-reducer/example_3.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React 博客项目：Context + Reducer
 * 文件: react/runoob/41-blog-context-reducer/example_3.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/context/FavoriteContext.jsx

import { createContext, useContext, useReducer, useEffect } from 'react'



// 1. 创建 Context

const FavoriteContext = createContext(null)



// 2. 定义 reducer

function favoriteReducer(state, action) {

  switch (action.type) {

    case 'TOGGLE':

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



// 3. Provider 组件：组合 Context + useReducer

export function FavoriteProvider({ children }) {

  // 从 localStorage 恢复初始状态

  const [favoriteIds, dispatch] = useReducer(favoriteReducer, [], () => {

    const saved = localStorage.getItem('blog-favorites')

    return saved ? JSON.parse(saved) : []

  })



  // 收藏列表变化时，自动同步到 localStorage

  useEffect(() => {

    localStorage.setItem('blog-favorites', JSON.stringify(favoriteIds))

  }, [favoriteIds])



  // 封装几个常用方法

  function toggleFavorite(id) {

    dispatch({ type: 'TOGGLE', id })

  }



  function isFavorite(id) {

    return favoriteIds.includes(id)

  }



  const value = {

    favoriteIds,

    favoriteCount: favoriteIds.length,

    toggleFavorite,

    isFavorite

  }



  return (

    <FavoriteContext.Provider value={value}>

      {children}

    </FavoriteContext.Provider>

  )

}



// 4. 自定义 Hook：封装 useContext，让调用方更简洁

export function useFavorites() {

  const context = useContext(FavoriteContext)

  if (!context) {

    throw new Error('useFavorites 必须在 FavoriteProvider 内部使用')

  }

  return context

}`;
export function mount() {}
