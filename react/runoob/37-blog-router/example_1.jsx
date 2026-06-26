/**
 * ============================================================
 * 章节: React 博客项目：路由
 * 文件: react/runoob/37-blog-router/example_1.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/router/index.jsx

import { createBrowserRouter } from 'react-router-dom'

import App from '../App'

import HomePage from '../pages/HomePage'

import PostPage from '../pages/PostPage'



// createBrowserRouter 创建路由实例

const router = createBrowserRouter([

  {

    path: '/',                // App 作为根布局

    element: <App />,

    children: [

      {

        index: true,          // index: true 表示 / 路径的默认子路由

        element: <HomePage />

      },

      {

        path: 'post/:id',     // 动态路由：:id 匹配任意值

        element: <PostPage />

      }

    ]

  }

])



export default router