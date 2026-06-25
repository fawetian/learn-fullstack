/**
 * 38-blog-useeffect: 导航栏组件
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
