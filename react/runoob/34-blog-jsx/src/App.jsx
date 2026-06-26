/**
 * ============================================================
 * 章节: React 博客项目：JSX
 * 文件: react/runoob/34-blog-jsx/src/App.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import React from 'react'
// 这是 React 的文章列表组件，作用是在主页中展示博客文章列表
// 需要注意：导入路径是相对路径，Vite 会自动解析 .jsx 扩展名
import ArticleList from './components/ArticleList'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React 博客</h1>
        <p>使用 JSX 语法渲染文章列表</p>
      </header>
      <main>
        {/* 这是 React 的自定义组件使用，使用方式与 HTML 标签类似，但必须以大写字母开头 */}
        {/* 需要注意：自定义组件必须用闭合标签或自闭合标签，否则会导致 JSX 解析错误 */}
        <ArticleList />
      </main>
      <footer className="app-footer">
        <p>基于 React 18 + Vite 构建</p>
      </footer>
    </div>
  )
}

export default App
