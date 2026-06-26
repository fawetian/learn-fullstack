/**
 * ============================================================
 * 章节: React VS Code 配置
 * 文件: react/runoob/06-vscode/example_1.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import { useState } from 'react';



const Greeting = ({ name = '陌生人' }) => {

  const [count, setCount] = useState(0);



  return (

    <div style={{ padding: '20px', border: '1px solid #ccc' }}>

      <h2>你好，{name}！</h2>

      <p>你已经点击了 {count} 次</p>

      <button onClick={() => setCount(count + 1)}>

        点击我 +1

      </button>

    </div>

  );

};



export default Greeting;