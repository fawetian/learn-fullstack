/**
 * 38-blog-useeffect: 页脚组件
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
