/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_12.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 错误处理示例

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err.message);
    process.exit(0);  // 优雅退出
});

// 模拟异步错误
setTimeout(() => {
    throw new Error('未捕获的异常');
}, 100);

// 1秒后自动退出（防止进程挂起）
setTimeout(() => {
    console.log('Process completed normally');
    process.exit(0);
}, 500);
