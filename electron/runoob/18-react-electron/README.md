# 18-react-electron - React 与 Electron 集成

本章节演示 React 与 Electron 的集成：
- **create-react-app + electron** - 标准集成方案
- **渲染进程使用 React** - 前端框架运行在 Electron 中
- **IPC 通信** - React 组件通过 Preload 调用 Electron API
- **开发模式** - 同时启动 React 开发服务器和 Electron

## 项目结构

```
18-react-electron/
├── public/
│   ├── electron.js        # 主进程入口
│   └── index.html         # HTML 模板
├── src/
│   ├── App.js             # React 主组件
│   ├── ipcAPI.js          # IPC 封装（调用 Preload 暴露的 API）
│   └── index.js           # React 入口
├── preload.js             # 预加载脚本
├── package.json           # 配置 scripts
└── README.md              # 本文件
```

## 文件说明

| 文件 | 功能 |
|------|------|
| `public/electron.js` | **主进程**：创建窗口，加载 React 开发服务器或打包文件 |
| `public/index.html` | React HTML 模板 |
| `preload.js` | **预加载脚本**：暴露 ipcAPI 到 window |
| `src/App.js` | **React 组件**：调用 Electron IPC |
| `src/ipcAPI.js` | **IPC 封装层**：React 友好的 API 封装 |
| `src/index.js` | React 渲染入口 |
| `package.json` | 配置 `npm start` 同时启动 React 和 Electron |

## 运行

```bash
npm install
npm start
```

## 打包

```bash
npm run build      # 构建 React 生产包
npm run electron-pack  # 打包 Electron 应用
```

## 架构说明

```
React 组件 (src/App.js)
    ↓ 调用
ipcAPI.js (src/ipcAPI.js)
    ↓ 调用
window.ipcAPI (preload.js 暴露)
    ↓ IPC
主进程 (public/electron.js)
    ↓ 返回结果
React 组件重新渲染
```
