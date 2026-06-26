/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_10.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 不好的例子：CPU 密集型任务会阻塞事件循环

// fibonacciSync 是纯计算任务，会一直占用 CPU，期间事件循环无法处理其他请求

function fibonacciSync(n) {
    if (n < 2) return n;
    return fibonacciSync(n - 1) + fibonacciSync(n - 2);
}

// 使用较小的数字进行演示（避免超时）
console.log('fibonacci(10):', fibonacciSync(10));

// 解决方案：使用 Worker Threads 将 CPU 密集型任务放到独立线程中执行，
// 主线程的事件循环就不会被阻塞
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    const worker = new Worker(__filename, {
        workerData: { n: 10 }
    });
    worker.on('message', (result) => {
        console.log('Worker 结果:', result);
        process.exit(0);  // 收到结果后退出
    });
} else {
    const result = fibonacciSync(workerData.n);
    parentPort.postMessage(result);
}
