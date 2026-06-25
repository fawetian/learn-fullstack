# 03-quick-start - Electron 快速开始

菜鸟教程"快速开始"章节的完整可运行项目。这是你的**第一个 Electron 桌面应用**。

## 核心概念

- **package.json**: 项目配置，`main` 字段指定 Electron 入口文件
- **main.js**: 主进程入口，负责创建窗口、加载页面、管理生命周期
- **index.html**: 渲染页面，普通 HTML/CSS 即可，由 Chromium 渲染

这三个文件组成 Electron 应用的最小骨架。

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置：`name` 名称、`main` 入口、`scripts.start` 启动命令 |
| `main.js` | 主进程：创建 800x600 窗口、加载 index.html、处理 macOS 激活事件 |
| `index.html` | 渲染页面：带 CSS 样式的欢迎页面，展示 "Hello, Electron!" |

## 运行

```bash
npm install
npm start
```

## 关键代码解读

**main.js 中的核心流程：**
1. `require('electron')` → 导入 Electron 核心模块
2. `new BrowserWindow()` → 创建浏览器窗口
3. `win.loadFile('index.html')` → 加载本地页面
4. `app.whenReady().then(...)` → 初始化完成后创建窗口
5. `app.on('window-all-closed', ...)` → 所有窗口关闭时退出（macOS 除外）

**index.html 中的要点：**
- 就是普通的 HTML/CSS，和写网页完全一样
- 被 Chromium 渲染，支持所有现代 Web 技术
- 通过 `win.loadFile()` 从主进程加载到窗口中
