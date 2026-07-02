/**
 * 章节: React 博客项目：useState
 * 来源: 35-blog-usestate/example_5.jsx（形状B | hooks）
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

    const [articles] = useState([

      { id: 1, title: 'React 入门完全指南', summary: '从零开始学 React', category: 'React', date: '2024-05-10' },

      { id: 2, title: 'JS 异步编程详解', summary: '搞懂 Promise 和 async/await', category: 'JavaScript', date: '2024-05-08' },

      { id: 3, title: 'CSS Grid 布局实战', summary: '用 Grid 实现响应式布局', category: 'CSS', date: '2024-05-05' },

      { id: 4, title: 'React Hooks 深入', summary: '深入理解 useState 和 useEffect', category: 'React', date: '2024-05-03' },

      { id: 5, title: 'Flexbox 完全指南', summary: '一文学会弹性布局', category: 'CSS', date: '2024-05-01' },

    ])

    const [activeCategory, setActiveCategory] = useState('全部')

    // 提取所有分类（去重）

    const categories = useMemo(() => {

      const cats = articles.map(a => a.category)

      return ['全部', ...new Set(cats)]

    }, [articles])

    // 根据分类过滤文章

    const filteredArticles = useMemo(() => {

      if (activeCategory === '全部') return articles

      return articles.filter(a => a.category === activeCategory)

    }, [articles, activeCategory])

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

          {/* 分类筛选按钮组 */}

          <div className="category-bar">

            {categories.map(cat => (

              <button

                key={cat}

                className={activeCategory === cat ? 'active' : ''}

                onClick={() => setActiveCategory(cat)}

              >

                {cat}

              </button>

            ))}

          </div>

          <p className="result-info">共 {filteredArticles.length} 篇</p>

          {filteredArticles.length === 0 ? (

            <p className="empty-tip">该分类下暂无文章</p>

          ) : (

            <div className="article-grid">

              {filteredArticles.map(article => (

                <div key={article.id} className="article-card">

                  <div className="card-content">

                    <span className="card-category">{article.category}</span>

                    <h3>{article.title}</h3>

                    <p>{article.summary}</p>

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

export const title = "React 博客项目：useState · example_5";
export const sourceFile = "35-blog-usestate/example_5.jsx";
export const shape = "B";
export const rawCode = "// 文件路径：src/App.jsx\n\nfunction App() {\n\n  const [articles] = useState([\n\n    { id: 1, title: 'React 入门完全指南', summary: '从零开始学 React', category: 'React', date: '2024-05-10' },\n\n    { id: 2, title: 'JS 异步编程详解', summary: '搞懂 Promise 和 async/await', category: 'JavaScript', date: '2024-05-08' },\n\n    { id: 3, title: 'CSS Grid 布局实战', summary: '用 Grid 实现响应式布局', category: 'CSS', date: '2024-05-05' },\n\n    { id: 4, title: 'React Hooks 深入', summary: '深入理解 useState 和 useEffect', category: 'React', date: '2024-05-03' },\n\n    { id: 5, title: 'Flexbox 完全指南', summary: '一文学会弹性布局', category: 'CSS', date: '2024-05-01' },\n\n  ])\n\n  const [activeCategory, setActiveCategory] = useState('全部')\n\n  // 提取所有分类（去重）\n\n  const categories = useMemo(() => {\n\n    const cats = articles.map(a => a.category)\n\n    return ['全部', ...new Set(cats)]\n\n  }, [articles])\n\n  // 根据分类过滤文章\n\n  const filteredArticles = useMemo(() => {\n\n    if (activeCategory === '全部') return articles\n\n    return articles.filter(a => a.category === activeCategory)\n\n  }, [articles, activeCategory])\n\n  return (\n\n    <div className=\"app\">\n\n      <header className=\"navbar\">\n\n        <h1 className=\"logo\">RUNOOB Blog</h1>\n\n        <nav>\n\n          <a href=\"/\">首页</a>\n\n          <a href=\"#\">关于</a>\n\n        </nav>\n\n      </header>\n\n      <main className=\"container\">\n\n        <h2 className=\"section-title\">最新文章</h2>\n\n        {/* 分类筛选按钮组 */}\n\n        <div className=\"category-bar\">\n\n          {categories.map(cat => (\n\n            <button\n\n              key={cat}\n\n              className={activeCategory === cat ? 'active' : ''}\n\n              onClick={() => setActiveCategory(cat)}\n\n            >\n\n              {cat}\n\n            </button>\n\n          ))}\n\n        </div>\n\n        <p className=\"result-info\">共 {filteredArticles.length} 篇</p>\n\n        {filteredArticles.length === 0 ? (\n\n          <p className=\"empty-tip\">该分类下暂无文章</p>\n\n        ) : (\n\n          <div className=\"article-grid\">\n\n            {filteredArticles.map(article => (\n\n              <div key={article.id} className=\"article-card\">\n\n                <div className=\"card-content\">\n\n                  <span className=\"card-category\">{article.category}</span>\n\n                  <h3>{article.title}</h3>\n\n                  <p>{article.summary}</p>\n\n                  <span className=\"card-date\">{article.date}</span>\n\n                </div>\n\n              </div>\n\n            ))}\n\n          </div>\n\n        )}\n\n      </main>\n\n      <footer className=\"footer\">\n\n        <p>© 2024 RUNOOB Blog. Powered by React.</p>\n\n      </footer>\n\n    </div>\n\n  )\n\n}\nApp";
