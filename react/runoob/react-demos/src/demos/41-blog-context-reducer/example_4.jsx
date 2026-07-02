/**
 * 章节: 博客·Context/Reducer
 * 来源: 41-blog-context-reducer/example_4.jsx —— ⚠️ 依赖外部文件（./context/FavoriteContext, ./router），属多文件项目片段，无法独立运行
 */
export const title = "博客·Context/Reducer · example_4 (源码展示)";
export const sourceFile = "41-blog-context-reducer/example_4.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React 博客项目：Context + Reducer
 * 文件: react/runoob/41-blog-context-reducer/example_4.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/main.jsx

import React from 'react'

import ReactDOM from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'

import { FavoriteProvider } from './context/FavoriteContext'

import router from './router'

import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    {/* Provider 包裹在最外层，所有组件都能访问 */}

    <FavoriteProvider>

      <RouterProvider router={router} />

    </FavoriteProvider>

  </React.StrictMode>

)`;
export function mount() {}
