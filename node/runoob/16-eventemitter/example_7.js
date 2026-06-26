/**
 * ============================================================
 * 章节: Node.js EventEmitter
 * 文件: node/runoob/16-eventemitter/example_7.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

var events = require('events');

var eventEmitter = new events.EventEmitter();



// 监听器 #1

var listener1 = function listener1() {

   console.log('监听器 listener1 执行。');

}



// 监听器 #2

var listener2 = function listener2() {

  console.log('监听器 listener2 执行。');

}



// 绑定 connection 事件，处理函数为 listener1 

eventEmitter.addListener('connection', listener1);



// 绑定 connection 事件，处理函数为 listener2

eventEmitter.on('connection', listener2);



var eventListeners = eventEmitter.listenerCount('connection');

console.log(eventListeners + " 个监听器监听连接事件。");



// 处理 connection 事件 

eventEmitter.emit('connection');



// 移除监绑定的 listener1 函数

eventEmitter.removeListener('connection', listener1);

console.log("listener1 不再受监听。");



// 触发连接事件

eventEmitter.emit('connection');



eventListeners = eventEmitter.listenerCount('connection');

console.log(eventListeners + " 个监听器监听连接事件。");



console.log("程序执行完毕。");