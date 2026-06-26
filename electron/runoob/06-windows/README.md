# 06-windows - Electron 窗口管理

本章节演示 Electron 的窗口管理功能：
- **启动画面 (Splash Screen)**：主窗口加载前显示过渡画面
- **多窗口**：父子窗口关系、模态对话框
- **窗口状态控制**：show/hide、ready-to-show、关闭事件
- **IPC 窗口间通信**：主窗口通过 IPC 打开子窗口

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 |
| `main.js` | **主进程**：创建启动画面 → 延迟创建主窗口 → 处理子窗口 IPC |
| `preload.js` | **预加载脚本**：暴露 `openChild`（打开子窗口）和 `getAppInfo`（获取应用信息） |
| `splash.html` | **启动画面**：无边框透明窗口，显示"加载中" |
| `index.html` | **主窗口**：应用主界面，展示应用信息，按钮打开子窗口 |
| `child.html` | **子窗口**：模态子窗口，演示父子窗口关系 |

## 窗口生命周期流程

```
1. 启动画面 (splash.html) - 无边框透明窗口
         ↓ 延迟 1.5 秒
2. 主窗口 (index.html) - 正常应用窗口
         ↓ 点击按钮
3. 子窗口 (child.html) - 模态对话框（parent: mainWindow）
```

## 运行

```bash
npm install
npm start
```

## 关键 API

- `BrowserWindow({ show: false })` - 初始隐藏，避免白屏
- `win.once('ready-to-show', ...)` - 页面加载完成后再显示
- `new BrowserWindow({ parent: mainWindow, modal: true })` - 模态子窗口
- `setTimeout()` - 模拟加载延迟，展示启动画面效果
