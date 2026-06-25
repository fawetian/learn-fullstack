/**
 * 36-blog-props: 导航栏组件
 * 来源章节: https://www.runoob.com/react/react-blog-props-component.html
 *
 * 这是 React 的 Props 接收组件，作用是展示博客顶部导航栏。
 * 需要注意：Props 是只读的，子组件不能修改 Props 的值。如果需要修改，必须通过回调通知父组件。
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
