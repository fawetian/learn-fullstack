/**
 * ============================================================
 * 章节: React Hooks
 * 文件: react/runoob/30-hooks/example_3.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import React, { useState, useEffect } from 'react';



function Example() {

  const [count, setCount] = useState(0);



  useEffect(() => {

    document.title = `You clicked ${count} times`;

  }, [count]); // 仅在 count 发生变化时更新标题



  return (

    <div>

      <p>You clicked {count} times</p>

      <button onClick={() => setCount(count + 1)}>Click me</button>

    </div>

  );

}



export default Example;