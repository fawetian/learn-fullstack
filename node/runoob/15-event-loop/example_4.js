/**
 * ============================================================
 * 章节: Node.js 事件循环
 * 文件: node/runoob/15-event-loop/example_4.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const EventEmitter = require('events');

const myEmitter = new EventEmitter();



// 注册事件处理器

myEmitter.on('greet', () => {

  console.log('Hello, world!');

});



// 触发事件

myEmitter.emit('greet');