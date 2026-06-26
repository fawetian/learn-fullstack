/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_6.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// Node.js 环境

// 注意：Node.js 中每个文件都是一个独立的模块，模块内的 this 不等于 global

console.log(this === global);  // false（在模块作用域中，this 指向 module.exports）

var globalVar = 'hello';

console.log(global.globalVar);  // undefined，模块内的变量不会自动挂载到 global



// Node.js 中的模块作用域

console.log(this);  // {} 空对象，即 module.exports 的初始值

console.log(module.exports === this);  // true，模块内 this 指向 module.exports