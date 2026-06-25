/**
 * 37-blog-router: 页脚组件
 * 来源章节: https://www.runoob.com/react/react-blog-router.html
 *
 * 这是复用 36-blog-props 的 Footer 组件，功能不变。
 */

import React from 'react'

function Footer({ copyright = `React 博客 © ${new Date().getFullYear()}` }) {
  return (
    <footer className="footer">
      <p>{copyright}</p>
    </footer>
  )
}

export default Footer
