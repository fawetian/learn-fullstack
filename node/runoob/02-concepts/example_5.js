/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_5.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 浏览器环境 vs Node.js 环境
// 在 Node.js 中模拟 window

global.window = globalThis;

console.log(this === global);  // true，在 Node.js 中顶层 this 就是 global 对象

var globalVar = 'hello';

console.log(global.globalVar);  // 'hello'，在 Node.js 中用 var 声明的变量会成为 global 的属性
