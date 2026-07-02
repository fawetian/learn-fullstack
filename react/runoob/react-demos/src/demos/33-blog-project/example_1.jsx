/**
 * 章节: 博客项目·初始化
 * 来源: 33-blog-project/example_1.jsx —— ⚠️ 依赖外部文件（./App.jsx），属多文件项目片段，无法独立运行
 */
export const title = "博客项目·初始化 · example_1 (源码展示)";
export const sourceFile = "33-blog-project/example_1.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React 博客项目：初始化
 * 文件: react/runoob/33-blog-project/example_1.jsx
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

import App from './App.jsx'

import './index.css'



// 找到 HTML 中的 <div id="root"></div>

// 用 createRoot 创建一个 React 根节点，然后把 <App /> 渲染进去

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <App />

  </React.StrictMode>

)`;
export function mount() {}
