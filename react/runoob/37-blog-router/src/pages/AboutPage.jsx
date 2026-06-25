/**
 * 37-blog-router: 关于页面
 * 来源章节: https://www.runoob.com/react/react-blog-router.html
 *
 * 这是 React Router 的静态页面组件，作用是展示博客关于信息。
 */

import React from 'react'

function AboutPage() {
  return (
    <div className="about-page">
      <h1>关于 React 博客</h1>
      <p>这是一个基于 React 18 + Vite 构建的渐进式博客项目。</p>
      <p>通过本项目，你可以学习到：</p>
      <ul>
        <li>JSX 语法与列表渲染</li>
        <li>useState 状态管理</li>
        <li>Props 组件拆分</li>
        <li>React Router 路由配置</li>
        <li>useEffect 数据请求</li>
        <li>自定义 Hook 封装</li>
        <li>Context + useReducer 全局状态</li>
      </ul>
    </div>
  )
}

export default AboutPage
