/**
 * ============================================================
 * 章节: React 博客项目：useState
 * 文件: react/runoob/35-blog-usestate/src/components/Counter.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import React, { useState } from 'react'

// 这是 React 的函数组件，作用是展示 useState 的基本用法
function Counter() {
  // 这是 React 的 useState Hook，作用是声明响应式状态
  // 参数 0 是初始值，返回一个数组 [当前状态, 更新函数]
  // 需要注意：useState 只能在组件顶层或自定义 Hook 中调用，不能在 if/循环/嵌套函数中调用
  const [count, setCount] = useState(0)

  // 这是 React 的状态递增函数，作用是将 count 加 1
  // 需要注意：当新状态依赖旧状态时，推荐写成函数式更新 setCount(prev => prev + 1)
  // 直接写法 setCount(count + 1) 在异步场景或闭包中可能读取到旧值
  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  return (
    <div className="counter">
      <h2>计数器</h2>
      {/* 这是 React 的状态渲染，count 变化时 React 会自动重新渲染 Counter 组件 */}
      <p>当前数值: {count}</p>
      <div className="counter-buttons">
        {/* 这是 React 的事件绑定，onClick 传入函数引用（不是调用），React 会在点击时执行 */}
        <button onClick={decrement}>减少</button>
        <button onClick={increment}>增加</button>
      </div>
    </div>
  )
}

export default Counter
