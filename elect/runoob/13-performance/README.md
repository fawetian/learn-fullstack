# 13-performance - Electron 性能优化

本章节演示 Electron 的性能优化技术：
- **延迟显示 (show: false)** - 页面 ready 后再显示，避免白屏
- **单实例锁 (single instance lock)** - 防止应用多开
- **内存监控** - 查看内存使用情况
- **懒加载** - 按需加载模块

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 |
| `main.js` | **主进程**：延迟显示、单实例锁、内存暴露 |
| `preload.js` | **预加载脚本**：暴露内存使用信息 |
| `index.html` | **渲染页面**：内存查看、懒加载演示 |

## 优化技巧

### 1. 延迟显示 (show: false)

```js
const win = new BrowserWindow({
  show: false,  // 初始隐藏
  // ...
});
win.once('ready-to-show', () => win.show());
```

### 2. 单实例锁

```js
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) { app.quit(); }
```

### 3. 内存管理

- 定期查看 process.memoryUsage()
- 避免全局变量和闭包引用未释放的对象
- 及时清理定时器和事件监听器

## 运行

```bash
npm install
npm start
```

## 更多优化建议

- 使用 Web Workers 处理 CPU 密集型任务
- 使用 asar 打包减少文件散乱
- 移除未使用的依赖
- 使用虚拟列表渲染大量数据
