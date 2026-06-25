# 14-2-file-manager - 项目二：文件管理器

教程实战项目第二题：文件管理器。

## 功能

- 左侧目录树，右侧文件列表
- 文件操作：新建、删除、重命名
- 拖拽文件到目标目录
- 搜索和排序
- 大目录异步读取，避免阻塞

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 |
| `main.js` | **主进程**：文件操作 IPC（fs/promises 异步）、拖拽处理、路径解析 |
| `preload.js` | **预加载脚本**：暴露 fsAPI（文件操作 + 目录树构建） |
| `index.html` | **渲染页面**：目录树、文件列表、拖拽区域、搜索排序 |
| `style.css` | 样式：双栏布局、目录树、文件列表、拖拽高亮 |

## 运行

```bash
cd 14-2-file-manager
npm install
npm start
```

## 学习要点

- **fs.promises**：异步读取目录，避免大目录阻塞主进程
- **path.join / path.dirname**：跨平台路径拼接和解析
- **HTML5 拖拽 API**：dragstart / dragover / drop
- **路径遍历**：递归构建目录树（使用 Promise.all 并行）
- **性能优化**：大目录异步读取、虚拟列表（本示例简化，仅展示异步）
