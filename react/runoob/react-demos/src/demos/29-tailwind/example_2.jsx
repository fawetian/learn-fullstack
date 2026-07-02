/**
 * 章节: React Tailwind CSS
 * 来源: 29-tailwind/example_2.jsx（形状B | 函数）
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
  const App = () => {

    return (

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="bg-white p-8 rounded-lg shadow-lg">

          <h1 className="text-2xl font-bold text-gray-900">Hello, RUNOOB!</h1>

          <p className="mt-4 text-gray-600">菜鸟教程，学的不仅是技术，更是梦想！</p>

          <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">

           点我试试

          </button>

        </div>

      </div>

    );

  };
  App;
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

export const title = "React Tailwind CSS · example_2";
export const sourceFile = "29-tailwind/example_2.jsx";
export const shape = "B";
export const rawCode = "const App = () => {\n\n  return (\n\n    <div className=\"min-h-screen bg-gray-100 flex items-center justify-center\">\n\n      <div className=\"bg-white p-8 rounded-lg shadow-lg\">\n\n        <h1 className=\"text-2xl font-bold text-gray-900\">Hello, RUNOOB!</h1>\n\n        <p className=\"mt-4 text-gray-600\">菜鸟教程，学的不仅是技术，更是梦想！</p>\n\n        <button className=\"mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700\">\n\n         点我试试\n\n        </button>\n\n      </div>\n\n    </div>\n\n  );\n\n};\nApp;";
