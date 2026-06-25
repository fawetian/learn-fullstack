# 33-blog-project: React 博客项目初始化

来源: https://www.runoob.com/react/react-blog-project-init.html

## 本章节在博客项目中的角色

这是博客项目的起点。本章创建完整的 Vite + React 项目骨架，为后续所有章节提供基础工程环境。后续所有功能（JSX 渲染、状态管理、组件拆分、路由、数据请求、搜索、自定义 Hook、全局状态、打包部署）都在此骨架上逐层叠加。

## 核心概念

1. **Vite** — 下一代前端构建工具，利用原生 ES 模块提供极速的冷启动和热更新（HMR）。
2. **项目结构** — 标准的 React 项目目录：`src/` 存放源码，`public/` 存放静态资源，`index.html` 是入口 HTML 模板。
3. **JSX 编译** — Vite 内置 `@vitejs/plugin-react`，自动将 JSX 编译为 `React.createElement` 调用，无需手动配置 Babel。
4. **ESM 模块** — Vite 原生支持 ES Modules，代码中可直接使用 `import/export` 语法。
5. **热模块替换（HMR）** — 开发时修改代码，浏览器页面局部更新，不丢失组件状态。

## 文件说明

| 文件 | 说明 |
|------|------|
| `package.json` | 项目依赖配置，包含 React 18 和 Vite 开发依赖 |
| `vite.config.js` | Vite 构建配置，集成 React 插件 |
| `index.html` | 入口 HTML 模板，挂载 `root` 节点 |
| `src/main.jsx` | 应用入口文件，创建 React 根实例并挂载到 DOM |
| `src/App.jsx` | 根组件，提供基础布局框架 |

## 运行方法

```bash
# 进入本章目录
cd 33-blog-project

# 安装依赖（演示用途，无需实际执行）
npm install

# 启动开发服务器
npm run dev
```

## 前后章节依赖关系

- **前序章节**：无（本章是博客项目起点）
- **后续章节**：`34-blog-jsx` — 在本章骨架基础上添加 JSX 渲染文章列表
