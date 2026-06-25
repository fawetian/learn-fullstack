# 10-file-system - Electron 文件系统与数据存储

本章节演示 Electron 中文件系统和数据存储的操作：
- **fs 模块** - Node.js 内置文件读写（主进程）
- **dialog.showOpenDialog** - 选择目录
- **文件系统操作** - 读取目录内容、读写文件

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 |
| `main.js` | **主进程**：注册 read-dir（读取目录）、read-file（读取文件）、write-file（写入文件）、select-dir（选择目录）IPC |
| `preload.js` | **预加载脚本**：暴露 `fsAPI` 对象，包含文件操作函数 |
| `index.html` | **渲染页面**：选择目录、读取目录、写入测试文件、读取测试文件四个按钮 |

## 安全设计

所有文件操作都在主进程中执行：
- 渲染进程不能直接使用 `fs` 模块（nodeIntegration: false）
- 必须通过 IPC 请求主进程执行文件操作
- 主进程可以验证路径，防止访问敏感目录

## 运行

```bash
npm install
npm start
```

点击"选择目录"选择任意文件夹，然后可以读取目录内容、写入测试文件，再用"读取测试文件"读回刚写入的 `test-electron.txt`，形成读写闭环。
