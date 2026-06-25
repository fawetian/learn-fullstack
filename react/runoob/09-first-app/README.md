# 09-first-app: 第一个 React 应用

来源: https://www.runoob.com/react/react-first-app.html

## 核心概念

1. **项目脚手架** — 使用 Vite 或 create-react-app 一键生成项目目录结构，包含 HTML 入口、JS 入口、开发服务器配置等。
2. **入口文件** — `src/main.jsx`（或 `src/index.js`）是应用入口，负责创建 React 根实例并挂载到 DOM。
3. **根组件** — `src/App.jsx` 是整个组件树的顶层组件，所有页面和功能组件都在 App 中组合。
4. **DOM 挂载** — `ReactDOM.createRoot(document.getElementById('root'))` 将 React 组件渲染到 HTML 中的 `<div id="root">` 节点。
5. **开发服务器** — `npm run dev` 启动本地开发服务器，提供热更新和源码映射（Source Map）支持。

## 文件说明

| 文件 | 说明 |
|------|------|
| `example_1.sh` | 创建项目命令 |
| `example_3.js` | 项目入口文件示例 |
| `example_4.js` | 根组件 App 示例 |

## 运行/学习方法

本章是实践入门章节。执行以下步骤创建你的第一个 React 应用：

```bash
npm create vite@latest my-first-app -- --template react
cd my-first-app
npm install
npm run dev
```

打开浏览器访问 `http://localhost:5173`，即可看到 React 默认页面。后续 `33-blog-project` 将在此基础上构建博客项目。
