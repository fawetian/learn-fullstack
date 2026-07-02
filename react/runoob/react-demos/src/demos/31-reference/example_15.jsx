/**
 * 章节: React 参考手册
 * 来源: 31-reference/example_15.jsx（形状C | hooks）
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
  function ParentComponent() {

    const [count, setCount] = useState(0);

    const increment = useCallback(() => {

      setCount(count + 1);

    }, [count]);

    return (

      <div>

        <ChildComponent onClick={increment} />

      </div>

    );

  }

  function ChildComponent({ onClick }) {

    return <button onClick={onClick}>Increment Count</button>;

  }
  /* ↑ 原始代码定义了组件，自动挑「ParentComponent」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(ParentComponent));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 参考手册 · example_15";
export const sourceFile = "31-reference/example_15.jsx";
export const shape = "C";
export const rawCode = "function ParentComponent() {\n\n  const [count, setCount] = useState(0);\n\n  const increment = useCallback(() => {\n\n    setCount(count + 1);\n\n  }, [count]);\n\n  return (\n\n    <div>\n\n      <ChildComponent onClick={increment} />\n\n    </div>\n\n  );\n\n}\n\nfunction ChildComponent({ onClick }) {\n\n  return <button onClick={onClick}>Increment Count</button>;\n\n}";
