/**
 * 章节: React 博客项目：路由
 * 来源: 37-blog-router/example_9.jsx（形状B | hooks）
 * 由 scripts/convert.mjs 自动生成 —— 可直接编辑本文件调整。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom'

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
  // 文件路径：src/pages/PostPage.jsx

  // 文章数据（后续章节会从外部加载）

  const articles = [

    { id: 1, title: 'React 入门完全指南', category: 'React', date: '2024-05-10',

      content: '<h2>为什么学 React？</h2><p>React 是目前最流行的前端框架之一...</p>' },

    { id: 2, title: 'JS 异步编程详解', category: 'JavaScript', date: '2024-05-08',

      content: '<h2>什么是异步？</h2><p>JS 是单线程的...</p>' },

  ]

  function PostPage() {

    const { id } = useParams()

    // 根据 ID 查找文章

    const article = useMemo(() => {

      return articles.find(a => a.id === Number(id))

    }, [id])

    // 文章不存在

    if (!article) {

      return (

        <div className="not-found">

          <h2>文章不存在</h2>

          <p>找不到 ID 为 {id} 的文章</p>

          <Link to="/">返回首页</Link>

        </div>

      )

    }

    // 文章存在

    return (

      <article className="post-view">

        <span className="category-tag">{article.category}</span>

        <h1>{article.title}</h1>

        <time>{article.date}</time>

        {/* dangerouslySetInnerHTML 等价于 Vue 的 v-html，注意 XSS 风险 */}

        <div

          className="content"

          dangerouslySetInnerHTML={{ __html: article.content }}

        />

        <Link to="/" className="back-link">← 返回首页</Link>

      </article>

    )

  }
  PostPage
  /* ↑ 原始代码定义了组件，自动挑「PostPage」渲染（外层包 BrowserRouter 提供 router 上下文） ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(BrowserRouter, null, React.createElement(PostPage)));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 博客项目：路由 · example_9";
export const sourceFile = "37-blog-router/example_9.jsx";
export const shape = "B";
export const rawCode = "// 文件路径：src/pages/PostPage.jsx\n\n// 文章数据（后续章节会从外部加载）\n\nconst articles = [\n\n  { id: 1, title: 'React 入门完全指南', category: 'React', date: '2024-05-10',\n\n    content: '<h2>为什么学 React？</h2><p>React 是目前最流行的前端框架之一...</p>' },\n\n  { id: 2, title: 'JS 异步编程详解', category: 'JavaScript', date: '2024-05-08',\n\n    content: '<h2>什么是异步？</h2><p>JS 是单线程的...</p>' },\n\n]\n\nfunction PostPage() {\n\n  const { id } = useParams()\n\n  // 根据 ID 查找文章\n\n  const article = useMemo(() => {\n\n    return articles.find(a => a.id === Number(id))\n\n  }, [id])\n\n  // 文章不存在\n\n  if (!article) {\n\n    return (\n\n      <div className=\"not-found\">\n\n        <h2>文章不存在</h2>\n\n        <p>找不到 ID 为 {id} 的文章</p>\n\n        <Link to=\"/\">返回首页</Link>\n\n      </div>\n\n    )\n\n  }\n\n  // 文章存在\n\n  return (\n\n    <article className=\"post-view\">\n\n      <span className=\"category-tag\">{article.category}</span>\n\n      <h1>{article.title}</h1>\n\n      <time>{article.date}</time>\n\n      {/* dangerouslySetInnerHTML 等价于 Vue 的 v-html，注意 XSS 风险 */}\n\n      <div\n\n        className=\"content\"\n\n        dangerouslySetInnerHTML={{ __html: article.content }}\n\n      />\n\n      <Link to=\"/\" className=\"back-link\">← 返回首页</Link>\n\n    </article>\n\n  )\n\n}\nPostPage";
