/**
 * ============================================================
 * 章节: React 博客项目：路由
 * 文件: react/runoob/37-blog-router/src/pages/AboutPage.jsx
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
