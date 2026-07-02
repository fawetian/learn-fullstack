/**
 * 章节: State 状态
 * 来源: 14-state/example_2.jsx —— ⚠️ 依赖外部文件（./Counter），属多文件项目片段，无法独立运行
 */
export const title = "State 状态 · example_2 (源码展示)";
export const sourceFile = "14-state/example_2.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React State（状态）
 * 文件: react/runoob/14-state/example_2.jsx
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

import './index.css';

import Counter from './Counter';



const root = ReactDOM.createRoot(document.getElementById("root"));

// 渲染 Counter 组件

root.render(<Counter />);`;
export function mount() {}
