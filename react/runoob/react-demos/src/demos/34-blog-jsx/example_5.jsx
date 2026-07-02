/**
 * 章节: React 博客项目：JSX
 * 来源: 34-blog-jsx/example_5.jsx（形状B | 函数）
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

    const articles = [

      {

        id: 1, title: 'React 入门完全指南',

        summary: '从零开始学习 React Hooks，涵盖 useState、useEffect 等核心概念。',

        date: '2024-05-10', category: 'React', cover: '/images/react.png'

      },

      {

        id: 2, title: 'JavaScript 异步编程详解',

        summary: '一文搞懂 Promise、async/await、事件循环与微任务队列。',

        date: '2024-05-08', category: 'JavaScript', cover: '/images/js.png'

      },

      {

        id: 3, title: 'CSS Grid 布局实战',

        summary: '用 CSS Grid 轻松实现复杂的响应式布局。',

        date: '2024-05-05', category: 'CSS', cover: '/images/css.png'

      }

    ]

    return (

      <div className="app">

        <header className="navbar">

          <h1 className="logo">RUNOOB Blog</h1>

          <nav>

            <a href="/">首页</a>

            <a href="#">关于</a>

          </nav>

        </header>

        <main className="container">

          <h2 className="section-title">最新文章</h2>

          {/* 条件渲染：有文章就显示，没文章就显示空态 */}

          {articles.length === 0 ? (

            <p className="empty-tip">还没有文章，敬请期待。</p>

          ) : (

            <div className="article-grid">

              {/* 列表渲染：map 遍历数组 */}

              {articles.map(article => (

                <div key={article.id} className="article-card">

                  <img src={article.cover} alt={article.title} className="card-cover" />

                  <div className="card-content">

                    <span className="card-category">{article.category}</span>

                    <h3 className="card-title">{article.title}</h3>

                    <p className="card-summary">{article.summary}</p>

                    <span className="card-date">{article.date}</span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </main>

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

export const title = "React 博客项目：JSX · example_5";
export const sourceFile = "34-blog-jsx/example_5.jsx";
export const shape = "B";
export const rawCode = "// 文件路径：src/App.jsx\n\nfunction App() {\n\n  const articles = [\n\n    {\n\n      id: 1, title: 'React 入门完全指南',\n\n      summary: '从零开始学习 React Hooks，涵盖 useState、useEffect 等核心概念。',\n\n      date: '2024-05-10', category: 'React', cover: '/images/react.png'\n\n    },\n\n    {\n\n      id: 2, title: 'JavaScript 异步编程详解',\n\n      summary: '一文搞懂 Promise、async/await、事件循环与微任务队列。',\n\n      date: '2024-05-08', category: 'JavaScript', cover: '/images/js.png'\n\n    },\n\n    {\n\n      id: 3, title: 'CSS Grid 布局实战',\n\n      summary: '用 CSS Grid 轻松实现复杂的响应式布局。',\n\n      date: '2024-05-05', category: 'CSS', cover: '/images/css.png'\n\n    }\n\n  ]\n\n  return (\n\n    <div className=\"app\">\n\n      <header className=\"navbar\">\n\n        <h1 className=\"logo\">RUNOOB Blog</h1>\n\n        <nav>\n\n          <a href=\"/\">首页</a>\n\n          <a href=\"#\">关于</a>\n\n        </nav>\n\n      </header>\n\n      <main className=\"container\">\n\n        <h2 className=\"section-title\">最新文章</h2>\n\n        {/* 条件渲染：有文章就显示，没文章就显示空态 */}\n\n        {articles.length === 0 ? (\n\n          <p className=\"empty-tip\">还没有文章，敬请期待。</p>\n\n        ) : (\n\n          <div className=\"article-grid\">\n\n            {/* 列表渲染：map 遍历数组 */}\n\n            {articles.map(article => (\n\n              <div key={article.id} className=\"article-card\">\n\n                <img src={article.cover} alt={article.title} className=\"card-cover\" />\n\n                <div className=\"card-content\">\n\n                  <span className=\"card-category\">{article.category}</span>\n\n                  <h3 className=\"card-title\">{article.title}</h3>\n\n                  <p className=\"card-summary\">{article.summary}</p>\n\n                  <span className=\"card-date\">{article.date}</span>\n\n                </div>\n\n              </div>\n\n            ))}\n\n          </div>\n\n        )}\n\n      </main>\n\n      <footer className=\"footer\">\n\n        <p>© 2024 RUNOOB Blog. Powered by React.</p>\n\n      </footer>\n\n    </div>\n\n  )\n\n}\nApp";
