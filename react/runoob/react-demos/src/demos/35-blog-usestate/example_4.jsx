/**
 * 章节: React 博客项目：useState
 * 来源: 35-blog-usestate/example_4.jsx（形状C | hooks）
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
  function ArticleFilter() {

    const [articles] = useState([

      { id: 1, title: 'React 入门', category: 'React' },

      { id: 2, title: 'Promise 详解', category: 'JavaScript' },

      { id: 3, title: 'Grid 布局', category: 'CSS' },

      { id: 4, title: 'React Hooks', category: 'React' }

    ])

    const [activeCategory, setActiveCategory] = useState('全部')

    // useMemo 缓存过滤结果，只有依赖变化时才重新计算

    const filteredArticles = useMemo(() => {

      console.log('重新计算过滤结果')  // 验证缓存效果

      if (activeCategory === '全部') return articles

      return articles.filter(a => a.category === activeCategory)

    }, [articles, activeCategory])  // 依赖数组

    // 用 useMemo 计算统计数据

    const totalCount = useMemo(() => articles.length, [articles])

    const filteredCount = useMemo(() => filteredArticles.length, [filteredArticles])

    return (

      <div>

        <p>共 {totalCount} 篇，当前 {filteredCount} 篇</p>

        <button onClick={() => setActiveCategory('全部')}>全部</button>

        <button onClick={() => setActiveCategory('React')}>React</button>

        <button onClick={() => setActiveCategory('JavaScript')}>JavaScript</button>

        <button onClick={() => setActiveCategory('CSS')}>CSS</button>

        {filteredArticles.map(a => (

          <div key={a.id}><h3>{a.title}</h3><span>{a.category}</span></div>

        ))}

      </div>

    )

  }
  /* ↑ 原始代码定义了组件，自动挑「ArticleFilter」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(ArticleFilter));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 博客项目：useState · example_4";
export const sourceFile = "35-blog-usestate/example_4.jsx";
export const shape = "C";
export const rawCode = "function ArticleFilter() {\n\n  const [articles] = useState([\n\n    { id: 1, title: 'React 入门', category: 'React' },\n\n    { id: 2, title: 'Promise 详解', category: 'JavaScript' },\n\n    { id: 3, title: 'Grid 布局', category: 'CSS' },\n\n    { id: 4, title: 'React Hooks', category: 'React' }\n\n  ])\n\n  const [activeCategory, setActiveCategory] = useState('全部')\n\n  // useMemo 缓存过滤结果，只有依赖变化时才重新计算\n\n  const filteredArticles = useMemo(() => {\n\n    console.log('重新计算过滤结果')  // 验证缓存效果\n\n    if (activeCategory === '全部') return articles\n\n    return articles.filter(a => a.category === activeCategory)\n\n  }, [articles, activeCategory])  // 依赖数组\n\n  // 用 useMemo 计算统计数据\n\n  const totalCount = useMemo(() => articles.length, [articles])\n\n  const filteredCount = useMemo(() => filteredArticles.length, [filteredArticles])\n\n  return (\n\n    <div>\n\n      <p>共 {totalCount} 篇，当前 {filteredCount} 篇</p>\n\n      <button onClick={() => setActiveCategory('全部')}>全部</button>\n\n      <button onClick={() => setActiveCategory('React')}>React</button>\n\n      <button onClick={() => setActiveCategory('JavaScript')}>JavaScript</button>\n\n      <button onClick={() => setActiveCategory('CSS')}>CSS</button>\n\n      {filteredArticles.map(a => (\n\n        <div key={a.id}><h3>{a.title}</h3><span>{a.category}</span></div>\n\n      ))}\n\n    </div>\n\n  )\n\n}";
