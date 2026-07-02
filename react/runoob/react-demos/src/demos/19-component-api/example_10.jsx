/**
 * 章节: React 组件 API
 * 来源: 19-component-api/example_10.jsx（形状A | class）
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
  class Counter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {clickCount: 0};
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
      this.setState(function(state) {
        return {clickCount: state.clickCount + 1};
      });
    }
    render () {
      return (<h2 onClick={this.handleClick}>点我！点击次数为: {this.state.clickCount}</h2>);
    }
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Counter />
  );

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 组件 API · example_10";
export const sourceFile = "19-component-api/example_10.jsx";
export const shape = "A";
export const rawCode = "class Counter extends React.Component{\n  constructor(props) {\n      super(props);\n      this.state = {clickCount: 0};\n      this.handleClick = this.handleClick.bind(this);\n  }\n  \n  handleClick() {\n    this.setState(function(state) {\n      return {clickCount: state.clickCount + 1};\n    });\n  }\n  render () {\n    return (<h2 onClick={this.handleClick}>点我！点击次数为: {this.state.clickCount}</h2>);\n  }\n}\nconst root = ReactDOM.createRoot(document.getElementById(\"root\"));\nroot.render(\n  <Counter />\n);";
