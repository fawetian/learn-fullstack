/**
 * 34-blog-jsx: 文章列表组件
 * 来源章节: https://www.runoob.com/react/react-blog-template-syntax.html
 *
 * 这是 React 的 JSX 列表渲染组件，作用是将静态文章数据通过 JSX 渲染为可视化的文章列表。
 * 需要注意：JSX 会被 Babel/Vite 编译为 React.createElement，所以必须导入 React（React 17+ 自动运行时无需显式导入，但显式导入是良好的实践）。
 */

import React from 'react'

// 这是 React 的模拟数据常量，作用是提供静态文章数据用于演示 JSX 渲染
// 需要注意：在实际应用中，这些数据通常来自后端 API，参见 38-blog-useeffect 章节
const articles = [
  { id: 1, title: 'React 入门指南', date: '2024-01-15', summary: '从零开始学习 React 的基础知识' },
  { id: 2, title: 'JSX 语法详解', date: '2024-01-20', summary: '深入理解 JSX 的编译原理和用法' },
  { id: 3, title: '组件化开发思想', date: '2024-02-01', summary: '如何拆分和复用 React 组件' },
  { id: 4, title: 'Hooks 最佳实践', date: '2024-02-10', summary: 'useState、useEffect 等 Hooks 的使用技巧' },
]

// 这是 React 的函数组件，作用是定义文章列表的 UI 结构和渲染逻辑
// 需要注意：函数组件名必须以大写字母开头，这是 React 区分组件与 HTML 标签的规则
function ArticleList() {
  return (
    <section className="article-list">
      {/* 这是 React 的 JSX 标题渲染，使用 className 代替 HTML 的 class 属性 */}
      <h2 className="article-list-title">最新文章</h2>
      
      {/* 这是 React 的 JSX 列表渲染，使用 array.map() 将数据数组映射为 JSX 元素数组 */}
      {/* 需要注意：map 必须返回一个 JSX 元素，且每个元素必须有唯一的 key 属性 */}
      <ul className="article-items">
        {articles.map((article) => (
          <li key={article.id} className="article-item">
            {/* 这是 React 的 JSX 花括号表达式，作用是在 JSX 中插入 JavaScript 变量的值 */}
            {/* 需要注意：花括号内只能写表达式，不能写语句（如 if/for），语句需要提前处理 */}
            <h3 className="article-title">{article.title}</h3>
            <time className="article-date">{article.date}</time>
            <p className="article-summary">{article.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ArticleList
