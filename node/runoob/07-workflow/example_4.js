/**
 * ============================================================
 * 章节: Node.js 开发流程
 * 文件: node/runoob/07-workflow/example_4.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const { Worker } = require('worker_threads');



const worker = new Worker(`

  const { parentPort } = require('worker_threads');

  parentPort.on('message', (msg) => {

    console.log('收到消息:', msg);

    parentPort.postMessage('消息已收到');

  });

`, { eval: true });



worker.on('message', (msg) => {

  console.log('来自工作线程的回复:', msg);

});



worker.postMessage('主线程消息');

// 自动退出（仅用于演示）
setTimeout(() => process.exit(0), 200);
