/**
 * ============================================================
 * 章节: React 博客项目：Context + Reducer
 * 文件: react/runoob/41-blog-context-reducer/example_1.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import { createContext, useContext, useState } from 'react'



// 第一步：创建 Context

const ThemeContext = createContext(null)



// 第二步：创建 Provider 组件

function ThemeProvider({ children }) {

  const [theme, setTheme] = useState('light')

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')



  return (

    <ThemeContext.Provider value={{ theme, toggleTheme }}>

      {children}

    </ThemeContext.Provider>

  )

}



// 第三步：在任意组件中使用

function ThemedButton() {

  const { theme, toggleTheme } = useContext(ThemeContext)

  return (

    <button onClick={toggleTheme}>

      当前主题：{theme}

    </button>

  )

}



// 第四步：在 App 中包裹 Provider

function App() {

  return (

    <ThemeProvider>

      <ThemedButton />

    </ThemeProvider>

  )

}