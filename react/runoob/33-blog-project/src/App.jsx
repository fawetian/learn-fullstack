/**
 * 33-blog-project: 根组件 App
 * 来源章节: https://www.runoob.com/react/react-blog-project-init.html
 *
 * 这是 React 的根组件，作用是组织整个博客应用的布局和顶级组件。
 * 需要注意：App 组件是 React 组件树的顶层，所有子组件都在此渲染。
 */

import React from 'react'

// 这是 React 的函数组件，作用是定义整个博客应用的 UI 结构
// 需要注意：函数组件必须返回一个 JSX 元素（或 null/Fragment），否则 React 会报错
function App() {
  return (
    <div className="app">
      {/* 这是 React 的 JSX 注释语法，花括号 + 块注释，注意不能直接使用 HTML 注释 */}
      <header className="app-header">
        <h1>React 博客项目</h1>
        <p>一个渐进式实战博客应用，从 JSX 到 Context 逐步构建</p>
      </header>
      <main>
        {/* 后续章节会在此添加文章列表、搜索栏、路由视图等组件 */}
        <p>项目骨架已初始化，等待添加博客功能...</p>
      </main>
      <footer className="app-footer">
        <p>基于 React 18 + Vite 构建</p>
      </footer>
    </div>
  )
}

export default App
