/**
 * ============================================================
 * 章节: React 博客项目：useState
 * 文件: react/runoob/35-blog-usestate/example_3.jsx
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



function TodoList() {

  const [todos, setTodos] = useState([

    { id: 1, text: '学习 React', done: false },

    { id: 2, text: '写博客', done: true }

  ])



  // 添加一项：展开旧数组 + 新元素

  function addTodo(text) {

    const newTodo = { id: Date.now(), text, done: false }

    setTodos([...todos, newTodo])        // 用展开运算符创建新数组

  }



  // 修改一项：map 遍历，找到要改的，返回新对象

  function toggleTodo(id) {

    setTodos(todos.map(todo =>

      todo.id === id ? { ...todo, done: !todo.done } : todo

    ))

  }



  // 删除一项：filter 过滤掉不想要的

  function removeTodo(id) {

    setTodos(todos.filter(todo => todo.id !== id))

  }



  return (

    <ul>

      {todos.map(todo => (

        <li key={todo.id} onClick={() => toggleTodo(todo.id)}>

          {todo.done ? <s>{todo.text}</s> : todo.text}

        </li>

      ))}

    </ul>

  )

}