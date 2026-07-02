/**
 * 章节: React 条件渲染
 * 来源: 17-conditional-rendering/example_4.jsx（形状A | class）
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
  function WarningBanner(props) {
    if (!props.warn) {
      return null;
    }
   
    return (
      <div className="warning">
        警告!
      </div>
    );
  }
   
  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {showWarning: true}
      this.handleToggleClick = this.handleToggleClick.bind(this);
    }
   
    handleToggleClick() {
      this.setState(prevState => ({
        showWarning: !prevState.showWarning
      }));
    }
   
    render() {
      return (
        <div>
          <WarningBanner warn={this.state.showWarning} />
          <button onClick={this.handleToggleClick}>
            {this.state.showWarning ? '隐藏' : '显示'}
          </button>
        </div>
      );
    }
  }
   
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Page />
  );

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 条件渲染 · example_4";
export const sourceFile = "17-conditional-rendering/example_4.jsx";
export const shape = "A";
export const rawCode = "function WarningBanner(props) {\n  if (!props.warn) {\n    return null;\n  }\n \n  return (\n    <div className=\"warning\">\n      警告!\n    </div>\n  );\n}\n \nclass Page extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {showWarning: true}\n    this.handleToggleClick = this.handleToggleClick.bind(this);\n  }\n \n  handleToggleClick() {\n    this.setState(prevState => ({\n      showWarning: !prevState.showWarning\n    }));\n  }\n \n  render() {\n    return (\n      <div>\n        <WarningBanner warn={this.state.showWarning} />\n        <button onClick={this.handleToggleClick}>\n          {this.state.showWarning ? '隐藏' : '显示'}\n        </button>\n      </div>\n    );\n  }\n}\n \nconst root = ReactDOM.createRoot(document.getElementById(\"root\"));\nroot.render(\n  <Page />\n);";
