/**
 * ============================================================
 * 章节: React 博客项目：useState
 * 文件: react/runoob/35-blog-usestate/example_1.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 从 react 中解构导入 useState

import { useState } from 'react'



function Counter() {

  // useState(初始值) 返回一个数组：[当前值, 更新函数]

  const [count, setCount] = useState(0)



  function handleClick() {

    setCount(count + 1)    // 更新状态，React 会自动重新渲染组件

  }



  return (

    <div>

      <p>点击次数：{count}</p>

      <button onClick={handleClick}>+1</button>

    </div>

  )

}