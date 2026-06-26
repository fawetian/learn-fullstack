/**
 * ============================================================
 * 章节: React 博客项目：自定义 Hooks
 * 文件: react/runoob/40-blog-custom-hooks/example_4.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/hooks/useDarkMode.js

import { useState, useEffect } from 'react'



export function useDarkMode() {

  // 从 localStorage 读取之前的设置

  const [isDark, setIsDark] = useState(() => {

    return localStorage.getItem('blog-theme') === 'dark'

  })



  // 当 isDark 变化时，同步到 DOM 和 localStorage

  useEffect(() => {

    if (isDark) {

      document.documentElement.classList.add('dark')

      localStorage.setItem('blog-theme', 'dark')

    } else {

      document.documentElement.classList.remove('dark')

      localStorage.setItem('blog-theme', 'light')

    }

  }, [isDark])



  function toggleDark() {

    setIsDark(!isDark)

  }



  return { isDark, toggleDark }

}