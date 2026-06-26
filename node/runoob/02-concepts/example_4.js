/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_4.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 模拟浏览器环境
global.window = globalThis;
global.document = { getElementById: (id) => ({ id }), querySelector: () => null };

// Node.js 中的全局对象和文件操作

console.log(typeof global);                         // Node.js 全局对象（对应浏览器中的 window）

const fs = require('fs');                          // 引入内置文件系统模块（浏览器中不可用）

fs.readFile('data.txt', 'utf8', (err, data) => {  // 读取服务器本地文件（浏览器中不可用）
    if (err) {
        console.error('Error:', err.message);
        return;
    }
    console.log('File content:', data);
});
