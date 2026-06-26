/**
 * ============================================================
 * 章节: React 博客项目：Props
 * 文件: react/runoob/36-blog-props/example_4.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import { useState } from 'react'

import CategoryFilter from './components/CategoryFilter'



function App() {

  const [activeCategory, setActiveCategory] = useState('全部')

  const categories = ['全部', 'React', 'JavaScript', 'CSS']



  // 回调函数：响应子组件的点击事件

  function handleCategoryChange(cat) {

    setActiveCategory(cat)

  }



  return (

    <CategoryFilter

      categories={categories}

      activeCategory={activeCategory}

      onCategoryChange={handleCategoryChange}

    />

  )

}