/**
 * ============================================================
 * 章节: React 博客项目：Props
 * 文件: react/runoob/36-blog-props/src/components/NavBar.jsx
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

// 这是 React 的 Props 解构写法，作用是从 props 对象中直接提取需要的属性
// 需要注意：props 默认是一个对象，可以通过解构 { title, links } 直接获取属性，代码更简洁
function NavBar({ title, links = [] }) {
  return (
    <nav className="navbar">
      {/* 这是 React 的 Props 渲染，title 由父组件传入，子组件只负责展示 */}
      <div className="navbar-brand">{title}</div>
      <ul className="navbar-links">
        {/* 这是 React 的 Props 列表渲染，links 数组由父组件传入 */}
        {/* 需要注意：为列表项提供 key 是 React 的性能优化要求，帮助 React 识别元素 */}
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.url}>{link.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
