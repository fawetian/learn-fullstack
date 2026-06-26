/**
 * ============================================================
 * 章节: React 安装（Vite）
 * 文件: react/runoob/04-install-vite/example_1.jsx
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

import reactLogo from './assets/react.svg'

import viteLogo from '/vite.svg'

import './App.css'



function App() {

  const [count, setCount] = useState(0)



  return (

    <div className="App">

      <div>

        <a href="https://vitejs.dev" target="_blank">

          <img src={viteLogo} className="logo" alt="Vite logo" />

        </a>

        <a href="https://react.dev" target="_blank">

          <img src={reactLogo} className="logo react" alt="React logo" />

        </a>

      </div>

      <h1>你好，React + Vite！</h1>

      <div className="card">

        <button onClick={() => setCount((count) => count + 1)}>

          当前计数：{count}

        </button>

      </div>

      <p>

        编辑 <code>src/App.jsx</code> 并保存体验热更新！

      </p>

    </div>

  )

}



export default App