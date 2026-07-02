/**
 * 来源: 11-rendering/example_1.jsx —— 把组件渲染到 DOM
 * ------------------------------------------------------------
 * 原文末尾:
 *   const root = ReactDOM.createRoot(document.getElementById("example"));
 *   root.render(<App />);
 * 改造: createRoot 的目标改成 DemoRunner 传入的 container（不再抢 #root）。
 */
import React from 'react';
import ReactDOM from 'react-dom/client';

// 创建一个简单的 React 组件
function App() {
  return <h1>Hello, React 18!</h1>;
}

// mount: 把内容渲染进 DemoRunner 提供的容器，返回清理函数
export function mount(container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
  // 卸载时调用 root.unmount()，释放资源
  return () => root.unmount();
}

// 供导航页显示的说明
export const title = '把组件渲染到 DOM';
export const note = 'createRoot(container).render(<App />) —— 最基础的渲染方式';
