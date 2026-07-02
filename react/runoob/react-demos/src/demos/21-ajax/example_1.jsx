/**
 * 章节: React AJAX
 * 来源: 21-ajax/example_1.jsx（形状B | hooks）
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
  const MyComponent = () => {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

      const fetchData = async () => {

        try {

          const response = await fetch('https://api.example.com/data');

          const result = await response.json();

          setData(result);

          setLoading(false);

        } catch (error) {

          console.error('Error fetching data:', error);

        }

      };

      fetchData();

    }, []);

    if (loading) {

      return <div>Loading...</div>;

    }

    return (

      <div>

        <h1>Data from API:</h1>

        <pre>{JSON.stringify(data, null, 2)}</pre>

      </div>

    );

  };
  MyComponent;
  /* ↑ 原始代码定义了组件，自动挑「MyComponent」渲染 ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(React.createElement(MyComponent));
  } catch(e) { console.error('自动渲染失败:', e); }

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React AJAX · example_1";
export const sourceFile = "21-ajax/example_1.jsx";
export const shape = "B";
export const rawCode = "const MyComponent = () => {\n\n  const [data, setData] = useState(null);\n\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n\n    const fetchData = async () => {\n\n      try {\n\n        const response = await fetch('https://api.example.com/data');\n\n        const result = await response.json();\n\n        setData(result);\n\n        setLoading(false);\n\n      } catch (error) {\n\n        console.error('Error fetching data:', error);\n\n      }\n\n    };\n\n    fetchData();\n\n  }, []);\n\n  if (loading) {\n\n    return <div>Loading...</div>;\n\n  }\n\n  return (\n\n    <div>\n\n      <h1>Data from API:</h1>\n\n      <pre>{JSON.stringify(data, null, 2)}</pre>\n\n    </div>\n\n  );\n\n};\nMyComponent;";
