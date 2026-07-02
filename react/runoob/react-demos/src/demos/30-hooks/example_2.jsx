/**
 * 章节: React Hooks
 * 来源: 30-hooks/example_2.jsx（形状C | hooks | 定时器）
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
  function Timer() {

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

      const interval = setInterval(() => {

        setSeconds(seconds => seconds + 1);

      }, 1000);

      return () => clearInterval(interval);

    }, []); // 空数组作为第二个参数表示仅在组件挂载和卸载时执行

    return <p>Timer: {seconds} seconds</p>;

  }
  /* ↑ 原始代码定义了组件，自动挑「Timer」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(Timer));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React Hooks · example_2";
export const sourceFile = "30-hooks/example_2.jsx";
export const shape = "C";
export const rawCode = "function Timer() {\n\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n\n    const interval = setInterval(() => {\n\n      setSeconds(seconds => seconds + 1);\n\n    }, 1000);\n\n    return () => clearInterval(interval);\n\n  }, []); // 空数组作为第二个参数表示仅在组件挂载和卸载时执行\n\n  return <p>Timer: {seconds} seconds</p>;\n\n}";
