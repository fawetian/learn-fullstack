/**
 * 章节: React 博客项目：搜索
 * 来源: 39-blog-search/example_1.jsx（形状C | hooks）
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
  function SearchDemo() {

    const [keyword, setKeyword] = useState('')

    const [results, setResults] = useState([])

    // 每当 keyword 变化时，重新执行过滤

    useEffect(() => {

      console.log('keyword 变为：', keyword)

      // 这里可以执行搜索逻辑

      setResults(/* 过滤结果 */)

    }, [keyword])  // 依赖 keyword

    return (

      <div>

        <input

          value={keyword}

          onChange={e => setKeyword(e.target.value)}

          placeholder="搜索..."

        />

        <p>当前搜索：{keyword}</p>

      </div>

    )

  }
  /* ↑ 原始代码定义了组件，自动挑「SearchDemo」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(SearchDemo));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 博客项目：搜索 · example_1";
export const sourceFile = "39-blog-search/example_1.jsx";
export const shape = "C";
export const rawCode = "function SearchDemo() {\n\n  const [keyword, setKeyword] = useState('')\n\n  const [results, setResults] = useState([])\n\n  // 每当 keyword 变化时，重新执行过滤\n\n  useEffect(() => {\n\n    console.log('keyword 变为：', keyword)\n\n    // 这里可以执行搜索逻辑\n\n    setResults(/* 过滤结果 */)\n\n  }, [keyword])  // 依赖 keyword\n\n  return (\n\n    <div>\n\n      <input\n\n        value={keyword}\n\n        onChange={e => setKeyword(e.target.value)}\n\n        placeholder=\"搜索...\"\n\n      />\n\n      <p>当前搜索：{keyword}</p>\n\n    </div>\n\n  )\n\n}";
