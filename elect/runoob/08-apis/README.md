# 08-apis - Electron 常用 API 演示

本章节是 Electron 常用 API 的交互式速查手册。
通过点击按钮可以实际体验各个 API 的效果，同时查看代码实现。

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 |
| `main.js` | **主进程**：注册 Dialog、Clipboard、Shell 的 IPC 处理函数 |
| `preload.js` | **预加载脚本**：暴露 `apiDemo` 对象，包含 6 个 API 函数 |
| `index.html` | **渲染页面**：分类按钮展示 Dialog / Clipboard / Shell 三类 API |

## 演示的 API

### Dialog（对话框）
- `dialog.showOpenDialog()` - 打开文件选择框
- `dialog.showSaveDialog()` - 打开保存文件框
- `dialog.showMessageBox()` - 显示消息框

### Clipboard（剪贴板）
- `clipboard.readText()` - 读取系统剪贴板文本
- `clipboard.writeText(text)` - 写入文本到剪贴板

### Shell（系统外壳）
- `shell.openExternal(url)` - 用系统默认浏览器打开 URL

## 运行

```bash
npm install
npm start
```
