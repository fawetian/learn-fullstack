/**
 * ============================================================
 * 章节: Node.js 开发流程
 * 文件: node/runoob/07-workflow/example_2.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const { fork } = require('child_process');

const child = fork('child.js');



child.on('message', (msg) => {

  console.log('来自子进程的消息:', msg);

});



child.send({ hello: 'world' });