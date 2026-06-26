/**
 * ============================================================
 * 章节: React Tailwind CSS
 * 文件: react/runoob/29-tailwind/example_2.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import React from 'react';



const App = () => {

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-lg shadow-lg">

        <h1 className="text-2xl font-bold text-gray-900">Hello, RUNOOB!</h1>

        <p className="mt-4 text-gray-600">菜鸟教程，学的不仅是技术，更是梦想！</p>

        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">

         点我试试

        </button>

      </div>

    </div>

  );

};



export default App;