# 05-architecture - Electron 架构详解（文件管理器）

本章节通过构建一个**文件管理器**来演示 Electron 的完整架构：
- 主进程创建窗口并处理系统级操作（文件系统访问）
- 渲染进程展示界面并响应用户交互
- Preload 脚本安全桥接，防止渲染进程直接访问 fs
- 使用 `invoke/handle` 模式进行双向 IPC 通信

## 架构流程

```
用户点击 "选择文件" → 渲染进程 → Preload 脚本 → IPC → 主进程
                                                      ↓
用户看到文件内容 ← 渲染进程 ← Preload 脚本 ← IPC ← 主进程 (fs.readFile)
```

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 |
| `main.js` | **主进程**：创建窗口，注册 `read-file`（读取文件）和 `select-file`（打开对话框）IPC |
| `preload.js` | **预加载脚本**：暴露 `fileAPI.readFile` 和 `fileAPI.selectFile` 两个 API |
| `index.html` | **渲染页面**：文件管理器界面，选择文件按钮 + 文件内容展示区域 |

## 涉及知识点

- `fs.promises.readFile()` - Node.js 异步读取文件
- `dialog.showOpenDialog()` - Electron 原生文件选择对话框
- `ipcMain.handle()` + `ipcRenderer.invoke()` - 双向 IPC 通信
- `contextBridge.exposeInMainWorld()` - 安全暴露 API

## 运行

```bash
npm install
npm start
```

点击 "选择文件" 后，选择任意文本文件，内容会显示在页面下方。
