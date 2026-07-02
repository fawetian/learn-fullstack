/**
 * 章节: React 博客项目：Context + Reducer
 * 来源: 41-blog-context-reducer/example_1.jsx（形状C | hooks）
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
  // 第一步：创建 Context

  const ThemeContext = createContext(null)

  // 第二步：创建 Provider 组件

  function ThemeProvider({ children }) {

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

    return (

      <ThemeContext.Provider value={{ theme, toggleTheme }}>

        {children}

      </ThemeContext.Provider>

    )

  }

  // 第三步：在任意组件中使用

  function ThemedButton() {

    const { theme, toggleTheme } = useContext(ThemeContext)

    return (

      <button onClick={toggleTheme}>

        当前主题：{theme}

      </button>

    )

  }

  // 第四步：在 App 中包裹 Provider

  function App() {

    return (

      <ThemeProvider>

        <ThemedButton />

      </ThemeProvider>

    )

  }
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

export const title = "React 博客项目：Context + Reducer · example_1";
export const sourceFile = "41-blog-context-reducer/example_1.jsx";
export const shape = "C";
export const rawCode = "// 第一步：创建 Context\n\nconst ThemeContext = createContext(null)\n\n// 第二步：创建 Provider 组件\n\nfunction ThemeProvider({ children }) {\n\n  const [theme, setTheme] = useState('light')\n\n  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')\n\n  return (\n\n    <ThemeContext.Provider value={{ theme, toggleTheme }}>\n\n      {children}\n\n    </ThemeContext.Provider>\n\n  )\n\n}\n\n// 第三步：在任意组件中使用\n\nfunction ThemedButton() {\n\n  const { theme, toggleTheme } = useContext(ThemeContext)\n\n  return (\n\n    <button onClick={toggleTheme}>\n\n      当前主题：{theme}\n\n    </button>\n\n  )\n\n}\n\n// 第四步：在 App 中包裹 Provider\n\nfunction App() {\n\n  return (\n\n    <ThemeProvider>\n\n      <ThemedButton />\n\n    </ThemeProvider>\n\n  )\n\n}";
