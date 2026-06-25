# 11-debug-test - Electron 调试与测试

本章节演示 Electron 的调试配置和测试方法：
- **开发者工具 (DevTools)** - 自动打开，调试渲染进程
- **VS Code 调试** - launch.json 配置，断点调试主进程
- **Preload 信息** - 暴露进程信息到渲染进程

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 |
| `main.js` | **主进程**：创建窗口，自动打开 DevTools，暴露进程信息 |
| `preload.js` | **预加载脚本**：暴露平台信息和版本信息 |
| `index.html` | **渲染页面**：显示平台信息和版本信息 |
| `.vscode/launch.json` | **VS Code 调试配置**：Electron 主进程调试 |

## 调试方法

### 1. 开发者工具（DevTools）

```js
// main.js 中自动打开
win.webContents.openDevTools();

// 或全局快捷键触发
// 参考 07-native-features 中的 globalShortcut.register
```

### 2. VS Code 断点调试

1. 在 VS Code 中打开本目录
2. 在 main.js 中设置断点
3. 按 F5 启动调试（使用 launch.json 配置）
4. 程序会在断点处暂停，可以查看变量、调用栈

### 3. 渲染进程调试

渲染进程直接用 Chrome DevTools 调试：
- Elements: 查看 DOM
- Console: 查看 JS 输出
- Network: 查看网络请求
- Sources: 断点调试渲染进程代码

## 运行

```bash
npm install
npm start
```

开发者工具会自动打开，可以查看 Console 和 Elements 面板。

## 测试框架

本目录为调试演示，实际测试可使用：
- **Spectron** - Electron 官方 E2E 测试框架（已废弃，推荐使用 Playwright）
- **Playwright** - 现代 E2E 测试框架，支持 Electron
- **Jest** - 单元测试
