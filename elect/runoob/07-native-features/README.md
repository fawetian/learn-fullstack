# 07-native-features - Electron 原生功能

本章节演示 Electron 访问操作系统原生功能的能力：
- **菜单 (Menu)** - 应用菜单栏和右键菜单
- **系统托盘 (Tray)** - 任务栏/菜单栏图标和菜单
- **对话框 (Dialog)** - 原生文件/消息/警告对话框
- **通知 (Notification)** - 系统原生通知
- **全局快捷键 (GlobalShortcut)** - 系统级热键注册

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 |
| `main.js` | **主进程**：创建菜单、托盘、对话框、通知、全局快捷键的完整演示 |
| `preload.js` | **预加载脚本**：暴露 `showDialog`（显示对话框）和 `onFileOpened`（监听文件打开） |
| `index.html` | **渲染页面**：按钮触发对话框、显示文件路径、提示快捷键 |
| `tray-icon.png` | 托盘图标（16x16 空白占位图） |

## 运行

```bash
npm install
npm start
```

## 功能清单

| 功能 | 触发方式 | 涉及的 Electron API |
|------|----------|---------------------|
| 应用菜单 | 自动创建（macOS 在屏幕顶部，"文件"并入应用名菜单） | `Menu.buildFromTemplate`, `Menu.setApplicationMenu` |
| 系统通知 | 页面按钮"显示通知" / 菜单"显示通知" | `new Notification` |
| 关于对话框 | 页面按钮"关于" / 菜单"关于" | `dialog.showMessageBox` |
| 打开文件对话框 | 页面按钮"打开文件" / 菜单"工具 → 打开文件" | `dialog.showOpenDialog` |
| 显示对话框 | 页面按钮"显示对话框" | IPC → `dialog.showMessageBox` |
| 全局快捷键 | Cmd/Ctrl+Shift+I | `globalShortcut.register` |
| 系统托盘 | 自动创建（macOS 右上角 / Windows 右下角） | `Tray`, `Menu.buildFromTemplate` |

> 说明：菜单、托盘、通知等原生功能在 macOS 上分散于系统区域（顶部菜单栏、右上角托盘、系统通知），不显示在网页窗口内。为方便学习，本示例已把通知、关于、打开文件等功能也做成**页面按钮**，点击即可在窗口内直接体验。

## 关键 API

- `Menu.buildFromTemplate(template)` - 从数组模板构建菜单
- `new Tray(icon)` - 创建系统托盘图标
- `dialog.showMessageBox()` / `dialog.showOpenDialog()` - 原生对话框
- `new Notification({ title, body })` - 系统通知
- `globalShortcut.register(accelerator, callback)` - 注册全局快捷键
