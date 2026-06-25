# 04-install-vite: 通过 Vite 使用 React

来源: https://www.runoob.com/react/react-install-vite.html

## 核心概念

1. **Vite** — 下一代前端构建工具，利用浏览器原生 ES 模块支持，实现极速冷启动（秒级）和热更新（HMR）。
2. **npm create vite** — Vite 官方脚手架命令，支持 React、Vue、Svelte 等多种模板，一键生成项目结构。
3. **ES Modules** — Vite 开发时直接使用原生 ESM，无需打包，生产时通过 Rollup 打包优化。
4. **HMR（热模块替换）** — 修改代码后浏览器局部更新，不刷新页面，保持组件状态。
5. **构建优化** — Vite 生产构建使用 Rollup，自动代码分割、Tree Shaking、压缩，生成高性能产物。

## 文件说明

| 文件 | 说明 |
|------|------|
| `example_1.sh` | Vite 创建项目命令 |
| `example_2.js` | 选择 React 模板 |
| `example_3.js` | 安装依赖命令 |
| `example_4.js` | 启动开发服务器 |
| `example_5.js` | 生产构建命令 |
| `example_6.js` | 预览生产构建 |
| `example_7.js` | Vite 项目结构说明 |

## 运行/学习方法

本章是推荐的 React 项目初始化方式。执行以下命令即可创建本教程使用的博客项目基础：

```bash
npm create vite@latest react-blog -- --template react
cd react-blog
npm install
npm run dev
```

后续 `33-blog-project` 章节将基于此结构创建完整的博客项目。
