/**
 * 章节: React 博客项目：JSX
 * 来源: 34-blog-jsx/example_4.jsx（形状C | 函数）
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
  function ArticlePage() {

    const articles = []

    const isLoading = false

    return (

      <div>

        {/* 方式一：三元表达式 — 适合二选一 */}

        {isLoading ? (

          <p>加载中，请稍候...</p>

        ) : (

          <p>加载完成！</p>

        )}

        {/* 方式二：&& 短路 — 适合「有条件就显示，没条件就不显示」 */}

        {articles.length === 0 && <p>还没有文章，敬请期待。</p>}

        {/* 方式三：if/else 在组件顶层 — 适合复杂多条件逻辑 */}

        {articles.length > 0 ? (

          <div>

            {articles.map(a => <div key={a.id}>{a.title}</div>)}

          </div>

        ) : (

          <p>暂无数据</p>

        )}

      </div>

    )

  }
  /* ↑ 原始代码定义了组件，自动挑「ArticlePage」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(ArticlePage));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 博客项目：JSX · example_4";
export const sourceFile = "34-blog-jsx/example_4.jsx";
export const shape = "C";
export const rawCode = "function ArticlePage() {\n\n  const articles = []\n\n  const isLoading = false\n\n  return (\n\n    <div>\n\n      {/* 方式一：三元表达式 — 适合二选一 */}\n\n      {isLoading ? (\n\n        <p>加载中，请稍候...</p>\n\n      ) : (\n\n        <p>加载完成！</p>\n\n      )}\n\n      {/* 方式二：&& 短路 — 适合「有条件就显示，没条件就不显示」 */}\n\n      {articles.length === 0 && <p>还没有文章，敬请期待。</p>}\n\n      {/* 方式三：if/else 在组件顶层 — 适合复杂多条件逻辑 */}\n\n      {articles.length > 0 ? (\n\n        <div>\n\n          {articles.map(a => <div key={a.id}>{a.title}</div>)}\n\n        </div>\n\n      ) : (\n\n        <p>暂无数据</p>\n\n      )}\n\n    </div>\n\n  )\n\n}";
