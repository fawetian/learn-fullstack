/**
 * 章节: React 顶层 API 参考
 * 来源: 31-reference/example_2.jsx —— ⚠️ React 顶层 API 用法片段（非组件），用源码展示
 */
export const title = "React 顶层 API 参考 · example_2 (源码展示)";
export const sourceFile = "31-reference/example_2.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React 参考手册
 * 文件: react/runoob/31-reference/example_2.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import React, { cloneElement } from 'react';



const parentElement = <div>Hello</div>;

const clonedElement = cloneElement(parentElement, { className: 'child' });

// clonedElement 是一个克隆的 React 元素，带有新的 className`;
export function mount() {}
