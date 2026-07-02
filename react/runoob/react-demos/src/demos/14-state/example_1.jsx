/**
 * 章节: React State（状态）
 * 来源: 14-state/example_1.jsx（形状B | class）
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
  class Counter extends Component {

    constructor(props) {

      super(props);

      this.state = { count: 0 };

    }

    increment = () => {

      this.setState({ count: this.state.count + 1 });

    }

    render() {

      return (

        <div>

          <p>Count: {this.state.count}</p>

          <button onClick={this.increment}>Increment</button>

        </div>

      );

    }

  }
  Counter;
  /* ↑ 原始代码定义了组件，自动挑「Counter」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(Counter));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React State（状态） · example_1";
export const sourceFile = "14-state/example_1.jsx";
export const shape = "B";
export const rawCode = "class Counter extends Component {\n\n  constructor(props) {\n\n    super(props);\n\n    this.state = { count: 0 };\n\n  }\n\n  increment = () => {\n\n    this.setState({ count: this.state.count + 1 });\n\n  }\n\n  render() {\n\n    return (\n\n      <div>\n\n        <p>Count: {this.state.count}</p>\n\n        <button onClick={this.increment}>Increment</button>\n\n      </div>\n\n    );\n\n  }\n\n}\nCounter;";
