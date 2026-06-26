/**
 * ============================================================
 * 章节: React 博客项目：useState
 * 文件: react/runoob/35-blog-usestate/example_2.jsx
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



function ArticleManager() {

  const [title, setTitle] = useState('默认标题')



  // 错误写法：直接修改

  // title = '新标题'  // React 不知道你改了，不会重新渲染



  // 正确写法：通过 setter 更新

  function updateTitle() {

    setTitle('新标题')  // React 知道状态变了，会重新渲染

  }



  return (

    <div>

      <p>{title}</p>

      <button onClick={updateTitle}>修改标题</button>

    </div>

  )

}