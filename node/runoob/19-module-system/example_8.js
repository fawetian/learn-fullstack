/**
 * ============================================================
 * 章节: Node.js 模块系统
 * 文件: node/runoob/19-module-system/example_8.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 演示循环依赖（circular dependency）的处理
// 注意：实际开发中应尽量避免循环依赖

// a.js 内容
const b = require('./b');
console.log('a.js: b.message =', b.message || 'undefined (circular dependency)');
module.exports = { message: 'Hello from a' };

// 避免循环依赖的更好方式：
// 1. 将共享代码提取到第三个模块
// 2. 使用依赖注入
// 3. 重新设计模块结构
