/**
 * 章节: React 博客项目：搜索
 * 来源: 39-blog-search/example_2.jsx（形状C | hooks | 定时器）
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
  function useDebounce(value, delay = 300) {

    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {

      // 设置定时器：delay ms 后更新 debouncedValue

      const timer = setTimeout(() => {

        setDebouncedValue(value)

      }, delay)

      // 清理函数：如果 value 在 delay 内又变了，清除上一个定时器

      return () => clearTimeout(timer)

    }, [value, delay])

    return debouncedValue

  }

  // 使用防抖

  function SearchInput() {

    const [keyword, setKeyword] = useState('')

    const debouncedKeyword = useDebounce(keyword, 300)

    // 只在防抖后的值变化时才执行（如发请求）

    useEffect(() => {

      if (debouncedKeyword) {

        console.log('真正执行搜索：', debouncedKeyword)

        // fetch(`/api/search?q=${debouncedKeyword}`)

      }

    }, [debouncedKeyword])

    return (

      <input

        value={keyword}

        onChange={e => setKeyword(e.target.value)}

        placeholder="搜索..."

      />

    )

  }
  /* ↑ 原始代码定义了组件，自动挑「SearchInput」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(SearchInput));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 博客项目：搜索 · example_2";
export const sourceFile = "39-blog-search/example_2.jsx";
export const shape = "C";
export const rawCode = "function useDebounce(value, delay = 300) {\n\n  const [debouncedValue, setDebouncedValue] = useState(value)\n\n  useEffect(() => {\n\n    // 设置定时器：delay ms 后更新 debouncedValue\n\n    const timer = setTimeout(() => {\n\n      setDebouncedValue(value)\n\n    }, delay)\n\n    // 清理函数：如果 value 在 delay 内又变了，清除上一个定时器\n\n    return () => clearTimeout(timer)\n\n  }, [value, delay])\n\n  return debouncedValue\n\n}\n\n// 使用防抖\n\nfunction SearchInput() {\n\n  const [keyword, setKeyword] = useState('')\n\n  const debouncedKeyword = useDebounce(keyword, 300)\n\n  // 只在防抖后的值变化时才执行（如发请求）\n\n  useEffect(() => {\n\n    if (debouncedKeyword) {\n\n      console.log('真正执行搜索：', debouncedKeyword)\n\n      // fetch(`/api/search?q=${debouncedKeyword}`)\n\n    }\n\n  }, [debouncedKeyword])\n\n  return (\n\n    <input\n\n      value={keyword}\n\n      onChange={e => setKeyword(e.target.value)}\n\n      placeholder=\"搜索...\"\n\n    />\n\n  )\n\n}";
