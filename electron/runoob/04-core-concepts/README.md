# 04-core-concepts - Electron 核心概念

本章节演示 Electron 四大核心概念：
1. **主进程 (Main Process)** - 控制中心，Node.js 环境
2. **渲染进程 (Renderer Process)** - 界面显示，Chromium 环境
3. **IPC (进程间通信)** - 主进程 ↔ 渲染进程的数据通道
4. **Preload Script** - 安全桥接，隔离上下文中的 API 暴露

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置，入口 `main.js` |
| `main.js` | **主进程**：创建窗口，注册 `ping`（单向）和 `get-app-path`（双向）IPC 处理 |
| `preload.js` | **预加载脚本**：暴露 `sendPing`（发送）和 `getAppPath`（调用）两个 API |
| `index.html` | **渲染页面**：两个按钮分别演示单向通信和双向 invoke/handle 模式 |

## 两种 IPC 模式对比

| 模式 | 主进程 | 渲染进程 | 适用场景 |
|------|--------|----------|----------|
| **单向** `send`/`on` | `ipcMain.on('ping', ...)` | `ipcRenderer.send('ping')` | 通知事件、状态更新 |
| **双向** `invoke`/`handle` | `ipcMain.handle('get-app-path', ...)` | `ipcRenderer.invoke('get-app-path')` | 需要返回值的数据请求 |

## 运行

```bash
npm install
npm start
```
