/**
 * ============================================================
 * 章节: React 博客项目：路由
 * 文件: react/runoob/37-blog-router/src/components/NavBar.jsx
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
// 这是 React Router 的导航组件，作用是在不刷新页面的情况下切换路由
// 需要注意：NavLink 相比 Link 多了 active 状态类名，适合导航栏高亮当前页面
import { NavLink } from 'react-router-dom'

const navLinks = [
  { id: 1, name: '首页', url: '/' },
  { id: 2, name: '关于', url: '/about' },
]

function NavBar({ title }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* 这是 React Router 的 Logo 链接，点击返回首页 */}
        <NavLink to="/">{title}</NavLink>
      </div>
      <ul className="navbar-links">
        {navLinks.map((link) => (
          <li key={link.id}>
            {/* 这是 React Router 的 NavLink，作用是在当前路由匹配时自动添加 active 类名 */}
            {/* 需要注意：to 属性对应 Route 的 path，以 / 开头表示绝对路径 */}
            <NavLink
              to={link.url}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
