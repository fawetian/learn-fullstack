# 01-tutorial: React 教程

来源: https://www.runoob.com/react/react-tutorial.html

## 核心概念

1. **React 是什么** — Facebook 开发的前端 JavaScript 库，用于构建用户界面，以组件化和声明式编程为核心。
2. **组件化** — 将 UI 拆分为独立、可复用的组件，每个组件管理自己的状态。
3. **声明式编程** — 描述 UI 应该长什么样，而不是如何一步步操作 DOM，React 负责高效更新页面。
4. **虚拟 DOM** — React 在内存中维护虚拟 DOM 树，通过 Diff 算法对比前后差异，只更新变化的部分。
5. **单页应用（SPA）** — React 应用通常只有一个 HTML 页面，通过 JavaScript 动态切换视图，无需刷新页面。

## 文件说明

| 文件 | 说明 |
|------|------|
| `example_1.html` | 可直接运行的 React 入门示例：CDN 引入 React/Babel + 一个带状态的计数器组件 |

## 运行/学习方法

直接用浏览器打开 `example_1.html` 即可（双击文件，或在浏览器中打开），无需安装任何依赖或构建工具。

示例通过 CDN 引入三件套：

- **react / react-dom**：React 核心库与 DOM 渲染库
- **babel-standalone**：在浏览器里实时把 JSX 编译成普通 JS（所以写 JSX 的 `<script>` 要标 `type="text/babel"`）

页面会渲染一个标题和计数按钮，点击按钮演示 React 的状态（`useState`）与声明式更新。

> 说明：CDN 方式仅适合入门快速体验，正式项目应使用 Vite / Create React App 等构建工具。
