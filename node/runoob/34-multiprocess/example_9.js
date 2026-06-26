/**
 * ============================================================
 * 章节: Node.js 多进程
 * 文件: node/runoob/34-multiprocess/example_9.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// pool/worker.js

process.on('message', async (msg) => {

  if (msg.type === 'task') {

    const { id, payload } = msg;

    // 模拟重任务（斐波那契）

    const fib = (n) => (n <= 1 ? n : fib(n-1) + fib(n-2));

    const result = fib(payload.n);

    process.send({ type: 'done', id, result });

  }

});