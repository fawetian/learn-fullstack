/**
 * 35-blog-usestate: 计数器组件
 * 来源章节: https://www.runoob.com/react/react-blog-state-management.html
 *
 * 这是 React 的 useState 基础用法演示组件，作用是展示如何在函数组件中声明和更新状态。
 * 需要注意：useState 的更新函数是异步的，且 React 18 自动批处理同一事件中的多次 setState 调用。
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
