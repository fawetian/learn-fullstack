/**
 * ============================================================
 * 章节: Node.js EventEmitter
 * 文件: node/runoob/16-eventemitter/example_3.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

//event.js 文件

var events = require('events'); 

var emitter = new events.EventEmitter(); 

emitter.on('someEvent', function(arg1, arg2) { 

        console.log('listener1', arg1, arg2); 

}); 

emitter.on('someEvent', function(arg1, arg2) { 

        console.log('listener2', arg1, arg2); 

}); 

emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');