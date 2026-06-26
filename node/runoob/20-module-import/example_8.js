/**
 * ============================================================
 * 章节: Node.js ES6 模块
 * 文件: node/runoob/20-module-import/example_8.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// main.js - CommonJS 模块

// 导入具名导出
const user = require('./user.js');
const name = user.name;
const age = user.age;
console.log(name); // 输出: Alice

// 导入默认导出（CommonJS 中默认导出就是 module.exports）
const sayHello = user.sayHello;
sayHello(); // 输出: Hello, my name is Alice.

// 同时导入具名和默认导出
console.log('All exports:', Object.keys(user));
user.sayHello();

// 导入所有导出
console.log('User name:', user.name);
if (user.default) user.default();
