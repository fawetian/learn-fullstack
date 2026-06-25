# 14-1-notes - 项目一：桌面笔记应用

教程实战项目第一题：桌面笔记应用。

## 功能

- 创建、编辑、删除笔记
- 自动保存与本地存储（electron-store）
- 支持多窗口同时编辑
- Markdown 渲染预览
- 菜单快捷键（新建窗口、保存）

## 技术选型

| 技术 | 用途 |
|------|------|
| electron-store | 本地 JSON 数据持久化（自动保存笔记） |
| marked | Markdown 渲染 |
| IPC invoke/handle | 渲染进程 ↔ 主进程通信 |
| contextBridge | 安全暴露 API |

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 依赖：electron、electron-store、marked |
| `main.js` | **主进程**：窗口管理、菜单、electron-store 读写 IPC |
| `preload.js` | **预加载脚本**：暴露 notesAPI（getNotes / saveNotes / createWindow） |
| `index.html` | **渲染页面**：笔记列表 + 编辑器 + Markdown 预览 |
| `style.css` | 样式：分栏布局、笔记列表、编辑器样式 |

## 运行

```bash
cd 14-1-notes
npm install
npm start
```

## 学习要点

- **electron-store**：无需手动读写 JSON 文件，自动序列化，支持默认值
- **多窗口**：每个窗口独立加载 index.html，主进程管理窗口数组
- **自动保存**：编辑器输入 debounce 后自动触发 saveNotes
- **Markdown 渲染**：marked 库在渲染进程解析，实时预览
