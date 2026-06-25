# 14-practical - Electron 综合实战项目

本章节是一个综合实战项目，结合多个 Electron 功能：
- **多窗口管理** - 创建管理多个 BrowserWindow
- **菜单 + 托盘** - 系统菜单和托盘图标
- **通知** - 系统通知提示
- **文件系统操作** - 读写文件
- **IPC 通信** - 多窗口间的消息传递

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 |
| `main.js` | **主进程**：多窗口管理、菜单、托盘、文件操作、通知 IPC |
| `preload.js` | **预加载脚本**：暴露 practicalAPI 到渲染进程 |
| `index.html` | **主窗口页面**：多窗口操作、文件操作、通知 |

## 运行

```bash
npm install
npm start
```

## 功能演示

- 点击"打开新窗口"创建子窗口
- 点击"通知"发送系统通知
- 点击"选择文件"读取文件内容
- 点击"打开外部链接"调用 shell.openExternal
- 点击"在文件夹中显示"调用 shell.showItemInFolder
