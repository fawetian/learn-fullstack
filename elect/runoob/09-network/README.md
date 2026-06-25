# 09-network - Electron 网络通信

本章节演示 Electron 中的网络通信能力：
- **HTTP 请求** - 使用 axios 发起 REST API 请求
- **WebSocket 服务器** - 在 Electron 中创建 WebSocket 服务器
- **WebSocket 客户端** - 渲染进程连接 WebSocket 接收实时消息
- **Cookie 管理** - 通过 session 模块读写 Cookie

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置，依赖 axios 和 ws |
| `main.js` | **主进程**：axios HTTP 请求、WebSocket 服务器、Cookie 管理 |
| `preload.js` | **预加载脚本**：暴露 HTTP/WebSocket/Cookie 的 IPC API |
| `index.html` | **渲染页面**：4 个按钮分别演示 HTTP/WS/Cookie 功能 |

## 网络通信架构

```
┌─────────────┐     IPC      ┌─────────────┐     HTTP     ┌──────────────┐
│ 渲染进程     │  ───────────  │  主进程      │  ─────────  │  远程 API     │
│ (index.html) │              │  (main.js)  │              │  (jsonplaceholder)
└─────────────┘              └─────────────┘              └──────────────┘
                                     │
                                     │ ws.Server(port: 8081)
                                     ↓
                              ┌─────────────┐
                              │ WebSocket   │
                              │ 服务器      │
                              └─────────────┘
```

## 运行

```bash
npm install
npm start
```

## 操作说明

1. **获取 HTTP 数据** - 主进程用 axios 请求远程 API，返回数据给渲染进程
2. **连接 WebSocket** - 渲染进程连接本地的 ws://localhost:8081，接收每 3 秒推送的消息
3. **设置 Cookie** - 通过 session.cookies.set() 写入 Cookie
4. **读取 Cookie** - 通过 session.cookies.get() 读取 Cookie 值
