# 12-security - Electron 安全

本章节演示 Electron 的安全最佳实践：
- **contextIsolation: true** - 隔离预加载脚本和页面上下文
- **sandbox: true** - 沙箱模式，渲染进程完全隔离
- **nodeIntegration: false** - 禁止渲染进程使用 Node.js
- **CSP (Content Security Policy)** - 限制页面可加载的资源来源
- **IPC 输入验证** - 主进程验证来自渲染进程的数据

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 |
| `main.js` | **主进程**：安全配置的窗口创建，输入验证的 IPC 处理 |
| `preload.js` | **预加载脚本**：最小化 API 暴露 |
| `index.html` | **渲染页面**：CSP 策略头，安全输入演示 |

## 安全配置对照表

| 配置 | 值 | 作用 |
|------|-----|------|
| `contextIsolation` | `true` | 隔离页面和预加载脚本上下文 |
| `nodeIntegration` | `false` | 禁止页面使用 Node.js |
| `sandbox` | `true` | 渲染进程完全沙箱化 |
| `webSecurity` | `true` | 启用同源策略等 Web 安全 |
| CSP | `default-src 'self'` | 限制资源来源 |

## 运行

```bash
npm install
npm start
```

尝试输入超过 100 个字符的内容，会触发输入验证错误。
