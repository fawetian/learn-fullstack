/**
 * 36-blog-props: 页脚组件
 * 来源章节: https://www.runoob.com/react/react-blog-props-component.html
 *
 * 这是 React 的纯展示组件，作用是显示博客页脚信息。
 * 需要注意：纯展示组件（Presentational Component）只接收 Props 并渲染 UI，不管理状态。
 */

import React from 'react'

// 这是 React 的默认 Props 用法，copyright 默认值为当前年份
function Footer({ copyright = `React 博客 © ${new Date().getFullYear()}` }) {
  return (
    <footer className="footer">
      <p>{copyright}</p>
    </footer>
  )
}

export default Footer
