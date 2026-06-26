/**
 * ============================================================
 * 章节: React 博客项目：Context + Reducer
 * 文件: react/runoob/41-blog-context-reducer/src/components/NavBar.jsx
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
import { NavLink } from 'react-router-dom'

const navLinks = [
  { id: 1, name: '首页', url: '/' },
  { id: 2, name: '关于', url: '/about' },
]

function NavBar({ title }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">{title}</NavLink>
      </div>
      <ul className="navbar-links">
        {navLinks.map((link) => (
          <li key={link.id}>
            <NavLink to={link.url} className={({ isActive }) => (isActive ? 'active' : '')}>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
