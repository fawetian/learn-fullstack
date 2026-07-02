/**
 * 章节: React 博客项目：JSX
 * 来源: 34-blog-jsx/example_1.jsx（形状C | 函数）
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
  function HomePage() {

    const blogTitle = 'RUNOOB 前端笔记'

    const author = '小明'

    return (

      <div>

        <h1>{blogTitle}</h1>

        <p>作者：{author}</p>

        <p>当前时间：{new Date().toLocaleDateString()}</p>

        <p>欢迎语：{author ? `你好，${author}` : '欢迎访客'}</p>

      </div>

    )

  }
  /* ↑ 原始代码定义了组件，自动挑「HomePage」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(HomePage));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 博客项目：JSX · example_1";
export const sourceFile = "34-blog-jsx/example_1.jsx";
export const shape = "C";
export const rawCode = "function HomePage() {\n\n  const blogTitle = 'RUNOOB 前端笔记'\n\n  const author = '小明'\n\n  return (\n\n    <div>\n\n      <h1>{blogTitle}</h1>\n\n      <p>作者：{author}</p>\n\n      <p>当前时间：{new Date().toLocaleDateString()}</p>\n\n      <p>欢迎语：{author ? `你好，${author}` : '欢迎访客'}</p>\n\n    </div>\n\n  )\n\n}";
