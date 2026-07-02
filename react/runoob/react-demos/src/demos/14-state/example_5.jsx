/**
 * 章节: React State（状态）
 * 来源: 14-state/example_5.jsx（形状A | class）
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

  /* ↓↓↓ 原始 example 代码（原样执行，会自己挂载）↓↓↓ */
  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
   
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
   
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Clock />
  );

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React State（状态） · example_5";
export const sourceFile = "14-state/example_5.jsx";
export const shape = "A";
export const rawCode = "class Clock extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {date: new Date()};\n  }\n \n  render() {\n    return (\n      <div>\n        <h1>Hello, world!</h1>\n        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>\n      </div>\n    );\n  }\n}\n \nconst root = ReactDOM.createRoot(document.getElementById(\"root\"));\nroot.render(\n  <Clock />\n);";
