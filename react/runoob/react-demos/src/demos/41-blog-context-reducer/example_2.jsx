/**
 * 章节: React 博客项目：Context + Reducer
 * 来源: 41-blog-context-reducer/example_2.jsx（形状C | hooks）
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
  // reducer 函数：(当前状态, action) ⇒ 新状态

  function favoriteReducer(state, action) {

    switch (action.type) {

      case 'TOGGLE':

        // 如果已收藏则取消，未收藏则添加

        if (state.includes(action.id)) {

          return state.filter(id => id !== action.id)

        } else {

          return [...state, action.id]

        }

      case 'CLEAR':

        return []

      default:

        return state

    }

  }

  function FavoriteDemo() {

    // useReducer(reducer, 初始值)

    const [favoriteIds, dispatch] = useReducer(favoriteReducer, [])

    return (

      <div>

        <p>收藏数量：{favoriteIds.length}</p>

        <button onClick={() => dispatch({ type: 'TOGGLE', id: 1 })}>

          {favoriteIds.includes(1) ? '取消收藏 1' : '收藏 1'}

        </button>

        <button onClick={() => dispatch({ type: 'CLEAR' })}>清空收藏</button>

      </div>

    )

  }
  /* ↑ 原始代码定义了组件，自动挑「FavoriteDemo」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(FavoriteDemo));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 博客项目：Context + Reducer · example_2";
export const sourceFile = "41-blog-context-reducer/example_2.jsx";
export const shape = "C";
export const rawCode = "// reducer 函数：(当前状态, action) ⇒ 新状态\n\nfunction favoriteReducer(state, action) {\n\n  switch (action.type) {\n\n    case 'TOGGLE':\n\n      // 如果已收藏则取消，未收藏则添加\n\n      if (state.includes(action.id)) {\n\n        return state.filter(id => id !== action.id)\n\n      } else {\n\n        return [...state, action.id]\n\n      }\n\n    case 'CLEAR':\n\n      return []\n\n    default:\n\n      return state\n\n  }\n\n}\n\nfunction FavoriteDemo() {\n\n  // useReducer(reducer, 初始值)\n\n  const [favoriteIds, dispatch] = useReducer(favoriteReducer, [])\n\n  return (\n\n    <div>\n\n      <p>收藏数量：{favoriteIds.length}</p>\n\n      <button onClick={() => dispatch({ type: 'TOGGLE', id: 1 })}>\n\n        {favoriteIds.includes(1) ? '取消收藏 1' : '收藏 1'}\n\n      </button>\n\n      <button onClick={() => dispatch({ type: 'CLEAR' })}>清空收藏</button>\n\n    </div>\n\n  )\n\n}";
