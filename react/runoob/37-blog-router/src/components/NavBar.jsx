/**
 * 37-blog-router: 导航栏组件（路由版）
 * 来源章节: https://www.runoob.com/react/react-blog-router.html
 *
 * 这是 React Router 的导航组件，作用是提供声明式路由导航，避免页面刷新。
 * 需要注意：使用 Link/NavLink 代替 <a> 标签，实现客户端路由切换。
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
