/**
 * 章节: React 博客项目：初始化
 * 来源: 33-blog-project/example_4.jsx（形状B | 函数）
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
  // 文件路径：src/App.jsx

  function App() {

    return (

      <div className="app">

        {/* 顶部导航栏 */}

        <header className="navbar">

          <h1 className="logo">RUNOOB Blog</h1>

          <nav>

            <a href="/">首页</a>

            <a href="#">关于</a>

          </nav>

        </header>

        {/* 主内容区 */}

        <main className="container">

          <p>博客内容将在这里展示</p>

        </main>

        {/* 页脚 */}

        <footer className="footer">

          <p>© 2024 RUNOOB Blog. Powered by React.</p>

        </footer>

      </div>

    )

  }
  App
  /* ↑ 原始代码定义了组件，自动挑「App」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(App));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 博客项目：初始化 · example_4";
export const sourceFile = "33-blog-project/example_4.jsx";
export const shape = "B";
export const rawCode = "// 文件路径：src/App.jsx\n\nfunction App() {\n\n  return (\n\n    <div className=\"app\">\n\n      {/* 顶部导航栏 */}\n\n      <header className=\"navbar\">\n\n        <h1 className=\"logo\">RUNOOB Blog</h1>\n\n        <nav>\n\n          <a href=\"/\">首页</a>\n\n          <a href=\"#\">关于</a>\n\n        </nav>\n\n      </header>\n\n      {/* 主内容区 */}\n\n      <main className=\"container\">\n\n        <p>博客内容将在这里展示</p>\n\n      </main>\n\n      {/* 页脚 */}\n\n      <footer className=\"footer\">\n\n        <p>© 2024 RUNOOB Blog. Powered by React.</p>\n\n      </footer>\n\n    </div>\n\n  )\n\n}\nApp";
