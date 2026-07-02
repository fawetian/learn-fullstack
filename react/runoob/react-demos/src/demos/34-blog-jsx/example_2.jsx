/**
 * 章节: React 博客项目：JSX
 * 来源: 34-blog-jsx/example_2.jsx（形状C | 函数）
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
  function ArticleCard() {

    const coverUrl = '/images/react-cover.png'

    const linkUrl = '/post/1'

    return (

      <div>

        {/* 动态属性：花括号绑定 JS 变量 */}

        <img src={coverUrl} alt="文章封面" />

        <a href={linkUrl}>阅读全文</a>

        {/* 注意：class 要写成 className */}

        <div className="card active">卡片内容</div>

        {/* style 接受一个对象，属性名用驼峰式 */}

        <div style={{ color: '#42b883', fontSize: '16px' }}>

          绿色文字

        </div>

      </div>

    )

  }
  /* ↑ 原始代码定义了组件，自动挑「ArticleCard」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(ArticleCard));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 博客项目：JSX · example_2";
export const sourceFile = "34-blog-jsx/example_2.jsx";
export const shape = "C";
export const rawCode = "function ArticleCard() {\n\n  const coverUrl = '/images/react-cover.png'\n\n  const linkUrl = '/post/1'\n\n  return (\n\n    <div>\n\n      {/* 动态属性：花括号绑定 JS 变量 */}\n\n      <img src={coverUrl} alt=\"文章封面\" />\n\n      <a href={linkUrl}>阅读全文</a>\n\n      {/* 注意：class 要写成 className */}\n\n      <div className=\"card active\">卡片内容</div>\n\n      {/* style 接受一个对象，属性名用驼峰式 */}\n\n      <div style={{ color: '#42b883', fontSize: '16px' }}>\n\n        绿色文字\n\n      </div>\n\n    </div>\n\n  )\n\n}";
