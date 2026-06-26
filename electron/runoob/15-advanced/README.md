# 15-advanced - Electron 高级应用

本章节演示 Electron 的高级应用：
- **自定义协议** - 注册自定义 URL 协议（myapp://）
- **进程间高级通信** - 多窗口间的广播和定向通信
- **Window State 恢复** - 保存和恢复窗口大小位置
- **自动更新** - 自动更新架构介绍（基于 electron-updater）

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置（含 electron-updater） |
| `main.js` | **主进程**：自定义协议、窗口状态管理、广播 IPC |
| `preload.js` | **预加载脚本**：暴露高级 API |
| `index.html` | **渲染页面**：自定义协议、广播通信、窗口状态 |
| `window-state.json` | 窗口状态保存文件（自动创建） |

## 自定义协议

注册 `myapp://` 协议，使 Electron 应用可以通过 URL 启动：
```bash
myapp://open/file/path
```

## 自动更新

electron-updater 实现自动更新：
```js
const { autoUpdater } = require('electron-updater');
autoUpdater.checkForUpdatesAndNotify();
```

需要配置更新服务器（如 GitHub Releases、S3 等）。

## 运行

```bash
npm install
npm start
```

## 自定义协议测试

在命令行中运行：
```bash
# macOS
open "myapp://hello/world"

# Windows
start myapp://hello/world
```
（需要打包安装后注册协议才有效）
