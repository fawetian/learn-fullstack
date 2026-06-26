# Electron 教程学习项目

基于 [菜鸟教程 Electron 教程](https://www.runoob.com/electron/electron-tutorial.html) 的学习项目，所有源码附带详细中文注释。

## 目录结构

```
runoob/
├── 01-intro/              # 入门简介 - 创建第一个窗口，基础 IPC 通信
├── 02-install/            # 安装指南（参考目录）
├── 03-quick-start/        # 快速开始 - 最小 Electron 应用
├── 04-core-concepts/        # 核心概念 - IPC 通信模式详解
├── 05-architecture/         # 架构 - 进程通信、文件管理
├── 06-windows/            # 窗口管理 - 多窗口、父子窗口、闪屏
├── 07-native-features/      # 原生功能 - 菜单、托盘、对话框、快捷键、通知
├── 08-apis/               # API 使用 - Dialog、Clipboard、Shell、Notification
├── 09-network/            # 网络通信 - HTTP/axios、WebSocket、Cookie
├── 10-file-system/        # 文件系统 - 目录操作、文件读写
├── 11-debug-test/         # 调试测试 - DevTools、VS Code 配置
├── 12-security/           # 安全 - 安全配置、CSP、输入验证
├── 13-performance/        # 性能优化 - 延迟显示、单实例、内存监控
├── 14-1-notes/            # 项目一：桌面笔记应用（electron-store + Markdown + 多窗口）
├── 14-2-file-manager/       # 项目二：文件管理器（目录树 + 文件操作 + 拖拽）
├── 15-advanced/           # 高级应用 - 自定义协议、窗口状态、广播通信
├── 16-release/            # 发布应用（参考目录）
├── 17-packaging/          # 打包应用（参考目录）
├── 18-react-electron/     # React 集成 - React + Electron 开发模式
├── 19-vue-electron/       # Vue 集成 - Vue CLI + Electron Builder
└── README.md              # 本文件
```

## 可运行项目

以下目录可以直接运行：

```bash
# 进入任意可运行目录
cd 01-intro
npm install
npm start
```

| 目录 | 主题 | 可运行 |
|------|------|--------|
| 01-intro | 入门简介 | ✅ |
| 03-quick-start | 快速开始 | ✅ |
| 04-core-concepts | 核心概念 | ✅ |
| 05-architecture | 架构 | ✅ |
| 06-windows | 窗口管理 | ✅ |
| 07-native-features | 原生功能 | ✅ |
| 08-apis | API 使用 | ✅ |
| 09-network | 网络通信 | ✅ |
| 10-file-system | 文件系统 | ✅ |
| 11-debug-test | 调试测试 | ✅ |
| 12-security | 安全 | ✅ |
| 13-performance | 性能优化 | ✅ |
| 14-1-notes | 项目一：桌面笔记 | ✅ |
| 14-2-file-manager | 项目二：文件管理器 | ✅ |
| 15-advanced | 高级应用 | ✅ |
| 18-react-electron | React 集成 | ✅ |
| 19-vue-electron | Vue 集成 | ✅ |

## 参考目录

以下目录为文档说明，**不可运行**：

| 目录 | 内容 |
|------|------|
| 02-install | Electron 安装指南、镜像加速、版本选择 |
| 16-release | 应用发布方法、代码签名、自动更新 |
| 17-packaging | 打包配置、electron-builder 详解、体积优化 |

## 学习路线

1. **基础阶段**（01-05）：理解 Electron 架构、IPC 通信、窗口管理
2. **功能阶段**（06-10）：掌握原生功能、API 使用、网络通信、文件操作
3. **进阶阶段**（11-15）：调试技巧、安全最佳实践、性能优化、综合实战
4. **框架阶段**（18-19）：React/Vue 与 Electron 集成
5. **发布阶段**（16-17）：打包配置和发布流程（参考文档）

## 核心架构

```
主进程 (main.js)                    渲染进程 (index.html + JS)
    │                                   │
    │  ipcMain.handle()               │  window.api.xxx()
    │  ←──────────────────────────────  │  ipcRenderer.invoke()
    │                                   │
    │  Node.js API (fs, path, etc.)    │  Web API (DOM, fetch, etc.)
    │  系统 API (dialog, menu, etc.)   │  隔离运行（安全沙箱）
    │                                   │
    └────── 预加载脚本 (preload.js) ────┘
              contextBridge.exposeInMainWorld()
              （安全桥梁：只暴露白名单 API）
```

## 安全要点

- **contextIsolation: true** - 始终启用上下文隔离
- **nodeIntegration: false** - 禁止渲染进程使用 Node.js
- **sandbox: true** - 启用沙箱模式
- **Preload 白名单** - 只暴露必要的 API，最小权限原则
- **IPC 验证** - 主进程验证所有输入数据

## 快速启动新项目

```bash
mkdir my-app && cd my-app
npm init -y
npm install --save-dev electron

# 创建 main.js, preload.js, index.html
# 然后 npm start
```

## 推荐工具

- **VS Code** + Debugger for Chrome 扩展
- **electron-devtools-installer** - 安装 React/Vue  DevTools
- **electron-builder** - 应用打包和发布
- **electron-updater** - 自动更新

## 官方资源

- [Electron 官方文档](https://www.electronjs.org/docs/latest/)
- [Electron 中文文档](https://www.electronjs.org/zh/docs/latest/)
- [Electron Fiddle](https://www.electronjs.org/fiddle) - 在线测试代码

---

基于菜鸟教程整理，仅供学习使用。
