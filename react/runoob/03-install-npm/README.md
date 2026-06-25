# 03-install-npm: 通过 npm 使用 React

来源: https://www.runoob.com/react/react-install-npm.html

## 核心概念

1. **npm 包管理** — Node.js 的包管理器，用于安装 React 及其依赖库（react-dom、react-scripts）。
2. **create-react-app** — Facebook 官方提供的 React 项目脚手架，快速搭建基于 Webpack 的 React 开发环境（现已不推荐使用）。
3. **node_modules** — npm 安装的依赖包存放目录，不应提交到版本控制（需配合 `.gitignore`）。
4. **package.json** — 记录项目依赖、脚本命令和元数据，是项目的"配置清单"。
5. **npm start** — 启动开发服务器，提供热更新（HMR）和错误提示功能。

## 文件说明

| 文件 | 说明 |
|------|------|
| `example_1.js` | 安装命令示例 |
| `example_3.js` | 创建项目示例 |
| `example_4.js` | 启动项目示例 |
| `example_5.js` | 项目结构说明 |

## 运行/学习方法

本章是环境配置章节，说明传统 create-react-app 的安装方式。实际学习建议使用 `04-install-vite` 章节的 Vite 方式，启动速度更快。本章示例文件记录了命令和配置，可供参考对比。

```bash
# 传统方式（参考）
npm install -g create-react-app
npx create-react-app my-app
```
