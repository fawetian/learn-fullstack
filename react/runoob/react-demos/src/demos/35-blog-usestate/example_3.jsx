/**
 * 章节: React 博客项目：useState
 * 来源: 35-blog-usestate/example_3.jsx（形状C | hooks）
 * 由 scripts/convert.mjs 自动生成 —— 可直接编辑本文件调整。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// 把本 demo 渲染进 DemoRunner 提供的容器
export function mount(container) {
  // === 沙箱：让原代码 document.getElementById('root'/'example'/...) 都指向本容器 ===
  const _origGetById = document.getElementById.bind(document);
  document.getElementById = () => container;
  const _roots = [];
  const ReactDOM = {
    createRoot: (el) => { const r = createRoot(el || container); _roots.push(r); return r; },
    render: (elem, el) => { const r = createRoot(el || container); r.render(elem); _roots.push(r); },
    unmountComponentAtNode: () => {},
  };
  // 补上原代码常从 react 解构的符号（它们的 import 已被 cleanCode 清掉）
  const { Component, Fragment, PureComponent, useState, useEffect, useContext,
          useReducer, useCallback, useMemo, useRef, memo, createContext,
          createElement, Children, cloneElement, isValidElement } = React;
  // PropTypes 简易桩：原代码可能用 PropTypes.string 等，运行时不校验，返回 noop 函数
  const PropTypes = new Proxy(function(){}, {
    get: () => new Proxy(function(){}, { get: () => () => {}, set: () => true })
  });
  let _cleanup = () => {};

  /* ↓↓↓ 原始 example 代码（定义组件）↓↓↓ */
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
  /* ↑ 原始代码定义了组件，自动挑「TodoList」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(TodoList));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 博客项目：useState · example_3";
export const sourceFile = "35-blog-usestate/example_3.jsx";
export const shape = "C";
export const rawCode = "function TodoList() {\n\n  const [todos, setTodos] = useState([\n\n    { id: 1, text: '学习 React', done: false },\n\n    { id: 2, text: '写博客', done: true }\n\n  ])\n\n  // 添加一项：展开旧数组 + 新元素\n\n  function addTodo(text) {\n\n    const newTodo = { id: Date.now(), text, done: false }\n\n    setTodos([...todos, newTodo])        // 用展开运算符创建新数组\n\n  }\n\n  // 修改一项：map 遍历，找到要改的，返回新对象\n\n  function toggleTodo(id) {\n\n    setTodos(todos.map(todo =>\n\n      todo.id === id ? { ...todo, done: !todo.done } : todo\n\n    ))\n\n  }\n\n  // 删除一项：filter 过滤掉不想要的\n\n  function removeTodo(id) {\n\n    setTodos(todos.filter(todo => todo.id !== id))\n\n  }\n\n  return (\n\n    <ul>\n\n      {todos.map(todo => (\n\n        <li key={todo.id} onClick={() => toggleTodo(todo.id)}>\n\n          {todo.done ? <s>{todo.text}</s> : todo.text}\n\n        </li>\n\n      ))}\n\n    </ul>\n\n  )\n\n}";
