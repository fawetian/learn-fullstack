/**
 * ============================================================
 * 章节: React 博客项目：useEffect
 * 文件: react/runoob/38-blog-useeffect/example_1.jsx
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



function HomePage() {

  const [message, setMessage] = useState('加载中...')



  // useEffect(fn, deps)：在组件渲染后执行副作用

  useEffect(() => {

    console.log('组件已挂载到 DOM，可以执行副作用了')

    setMessage('数据加载完成！')

  }, [])  // 空依赖数组 = 仅在首次渲染后执行一次



  return <p>{message}</p>

}