# 01-intro - Electron 简介 Demo

本章节演示 Electron 最基本的概念：
- **主进程 (Main Process)** 如何创建窗口
- **渲染进程 (Renderer Process)** 如何展示界面
- **IPC (Inter-Process Communication)** 主进程和渲染进程如何通信
- **Preload Script** 如何安全地桥接两者

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置，声明入口为 `main.js`，开发依赖 `electron` |
| `main.js` | **主进程入口**：创建 BrowserWindow，监听 `app` 生命周期事件，处理 IPC `ping` 消息 |
| `preload.js` | **预加载脚本**：通过 `contextBridge` 安全暴露 `send`/`on` 两个 API 给渲染进程 |
| `index.html` | **渲染页面**：HTML 界面，点击按钮通过 preload 暴露的 API 发送 ping，接收 pong 响应 |

## 运行

```bash
npm install
npm start
```

点击按钮会触发 IPC 通信，查看控制台输出。
