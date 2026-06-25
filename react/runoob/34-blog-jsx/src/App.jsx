/**
 * 34-blog-jsx: 根组件 App
 * 来源章节: https://www.runoob.com/react/react-blog-template-syntax.html
 *
 * 这是 React 的根组件，作用是引入 ArticleList 组件并渲染到页面中。
 * 需要注意：组件嵌套是 React 组合的核心方式，通过 import 引入子组件并在 JSX 中使用。
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
