/**
 * 章节: React 列表与 Keys
 * 来源: 18-lists-keys/example_4.jsx（形状A | 函数）
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
  function Blog(props) {
    const sidebar = (
      <ul>
        {props.posts.map((post) =>
          <li key={post.id}>
            {post.title}
          </li>
        )}
      </ul>
    );
    const content = props.posts.map((post) =>
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    );
    return (
      <div>
        {sidebar}
        <hr />
        {content}
      </div>
    );
  }
   
  const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
  ];
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Blog posts={posts} />
  );

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React 列表与 Keys · example_4";
export const sourceFile = "18-lists-keys/example_4.jsx";
export const shape = "A";
export const rawCode = "function Blog(props) {\n  const sidebar = (\n    <ul>\n      {props.posts.map((post) =>\n        <li key={post.id}>\n          {post.title}\n        </li>\n      )}\n    </ul>\n  );\n  const content = props.posts.map((post) =>\n    <div key={post.id}>\n      <h3>{post.title}</h3>\n      <p>{post.content}</p>\n    </div>\n  );\n  return (\n    <div>\n      {sidebar}\n      <hr />\n      {content}\n    </div>\n  );\n}\n \nconst posts = [\n  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},\n  {id: 2, title: 'Installation', content: 'You can install React from npm.'}\n];\nconst root = ReactDOM.createRoot(document.getElementById(\"root\"));\nroot.render(\n  <Blog posts={posts} />\n);";
