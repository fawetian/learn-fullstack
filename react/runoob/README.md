# React 教程学习项目

基于 [菜鸟教程 React 教程](https://www.runoob.com/react/react-tutorial.html) 的学习项目，所有源码附带详细中文注释。

## 目录结构（42 章）

```
react/runoob/
├── 01-tutorial/              # React 教程 - 教程概览、React 是什么
├── 02-intro/                 # React 简介 - 起源、特点、生态系统
├── 03-install-npm/           # React 安装(NPM) - create-react-app / npm
├── 04-install-vite/          # React 安装(Vite) - Vite 脚手架
├── 05-install-cdn/           # React 安装(CDN) - CDN 引入方式
├── 06-vscode/                # React VSCode - 编辑器配置
├── 07-qoder/                 # React Qoder - 在线编辑器
├── 08-online/                # React 在线生成 - CodePen/StackBlitz
├── 09-first-app/             # React 创建第一个项目 - 脚手架、入口文件
├── 10-project-intro/         # React 项目说明 - 目录结构、配置
├── 11-rendering/             # React 元素渲染 - 渲染流程、虚拟 DOM
├── 12-jsx/                   # React JSX - JSX 语法（可运行 HTML 示例）⭐
├── 13-components/            # React 组件 - 函数/类组件（可运行）⭐
├── 14-state/                 # React 组件状态 - useState / setState（可运行）⭐
├── 15-props/                 # React Props - 父子组件通信（可运行）⭐
├── 16-event-handle/          # React 事件处理 - 事件绑定（可运行）⭐
├── 17-conditional-rendering/  # React 条件渲染 - if/三元/逻辑与（可运行）⭐
├── 18-lists-keys/            # React 列表 & Keys - map 渲染（可运行）⭐
├── 19-component-api/        # React 组件 API - setState/forceUpdate 等
├── 20-lifecycle/             # React 组件生命周期 - 挂载/更新/卸载
├── 21-ajax/                  # React AJAX - 数据请求（可运行）⭐
├── 22-forms-events/          # React 表单与事件 - 受控组件（可运行）⭐
├── 23-refs/                  # React Refs - DOM 引用（可运行）⭐
├── 24-conditional/           # React 条件判断 - 多种条件渲染方式
├── 25-router/                # React 路由 - React Router v6（可运行）⭐
├── 26-memo/                  # React Memo - 性能优化（可运行）⭐
├── 27-css/                   # React CSS - 样式方案
├── 28-sass/                  # React Sass - SCSS 预处理
├── 29-tailwind/              # React Tailwind CSS - Utility-First CSS
├── 30-hooks/                 # React Hooks - 10 个核心 Hooks（可运行）⭐
├── 31-reference/             # React 参考手册 - API 速查
├── 32-quiz/                  # React 测验 - 知识检验
├── 33-blog-project/          # 博客项目：项目初始化（Vite 完整项目骨架）⭐⭐
├── 34-blog-jsx/              # 博客项目：JSX 渲染文章列表
├── 35-blog-usestate/         # 博客项目：响应式数据 useState
├── 36-blog-props/            # 博客项目：拆分组件 Props
├── 37-blog-router/           # 博客项目：路由跳转
├── 38-blog-useeffect/        # 博客项目：副作用 useEffect 数据请求
├── 39-blog-search/           # 博客项目：实时搜索
├── 40-blog-custom-hooks/     # 博客项目：自定义 Hook
├── 41-blog-context-reducer/  # 博客项目：全局状态 Context + useReducer
├── 42-blog-deploy/           # 博客项目：打包上线部署到 Vercel
└── README.md                 # 本文件
```

## 可运行章节

带 ⭐ 的章节可以直接在浏览器中运行，无需 npm install：

```bash
# 进入任意核心章节，用浏览器打开 index.html
cd 12-jsx
open index.html          # macOS
# start index.html       # Windows
# xdg-open index.html    # Linux
```

这些文件通过 CDN 引入 React 18、ReactDOM 18 和 Babel Standalone，支持 JSX 直接在浏览器编译运行。

## 博客项目（渐进式实战）

```bash
cd 33-blog-project
npm install
npm run dev
```

博客项目从 `33-blog-project` 到 `42-blog-deploy` 是同一个渐进式项目：

```
33 → 34 → 35 → 36 → 37 → 38 → 39 → 40 → 41 → 42
项目初始化 → JSX 渲染 → useState → 拆分组件 → 路由 → 数据请求 → 搜索 → 自定义 Hook → 全局状态 → 部署
```

每个章节目录中都有对应的功能代码文件，可以逐步复制到 `33-blog-project/src/` 中体验渐进式开发。

## 学习路线

| 阶段 | 章节 | 目标 |
|------|------|------|
| **环境准备** | 01-10 | 了解 React 是什么，安装开发环境 |
| **核心概念** | 11-18 | 掌握 JSX、组件、State、Props、事件、条件、列表 |
| **进阶特性** | 19-32 | 生命周期、AJAX、表单、Refs、路由、Memo、Hooks、CSS 方案 |
| **实战项目** | 33-42 | 从 0 到 1 构建一个博客应用，部署上线 |

## 核心知识点速查

| 概念 | 说明 | 相关章节 |
|------|------|---------|
| JSX | JavaScript 语法扩展，编译为 `React.createElement` | 12 |
| 组件 | UI 的基本单元，函数组件或类组件 | 13 |
| State | 组件内部可变状态，驱动重新渲染 | 14 |
| Props | 父组件向子组件传递数据（只读） | 15 |
| 事件 | 合成事件系统，`onClick` 等驼峰命名 | 16 |
| 条件渲染 | `if` / `&&` / 三元运算符 | 17, 24 |
| 列表渲染 | `Array.map()` + `key` 属性 | 18 |
| Hooks | 函数组件使用状态和副作用的能力 | 30 |
| useState | 状态 Hook | 14, 35 |
| useEffect | 副作用 Hook（数据请求、订阅、DOM 操作） | 38 |
| useContext | 跨组件共享数据，避免 Props Drilling | 41 |
| Router | 单页应用路由，React Router v6 | 25, 37 |
| Context | 全局状态传递 | 41 |
| 自定义 Hook | 复用组件逻辑 | 40 |

## 注释风格

所有代码文件遵循统一注释规范：

```js
/**
 * [章节编号]-[章节名] - [文件用途]
 *
 * 核心概念：
 * 1. [概念1] - [解释]
 * 2. [概念2] - [解释]
 *
 * 注意事项：
 * - [陷阱/要点]
 */
```

行内注释说明 React 机制：
```js
// React 的 JSX 编译后会转换为 React.createElement() 调用
// useEffect 的依赖数组决定何时重新执行副作用
// key 属性帮助 React 识别列表项的身份，优化 Diff 算法
```

## 官方资源

- [React 官方文档](https://react.dev/)
- [React 中文文档](https://zh-hans.react.dev/)
- [React GitHub](https://github.com/facebook/react)

---

基于菜鸟教程整理，仅供学习使用。
