/**
 * 章节: CSS 样式
 * 来源: 27-css/example_7.jsx —— ⚠️ 依赖外部文件（./MyComponent.module.css），属多文件项目片段，无法独立运行
 */
export const title = "CSS 样式 · example_7 (源码展示)";
export const sourceFile = "27-css/example_7.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React CSS
 * 文件: react/runoob/27-css/example_7.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import React from 'react';

import ReactDOM from 'react-dom';

import styles from './MyComponent.module.css';



const MyComponent = () => {

  return (

    <div className={styles.container}>

      <h1 className={styles.title}>Hello, world!</h1>

    </div>

  );

};



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<MyComponent />);`;
export function mount() {}
