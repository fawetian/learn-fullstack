/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_3.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 浏览器中的全局对象和 DOM 操作
// 在 Node.js 中模拟浏览器环境

global.window = globalThis;
global.document = {
    getElementById: (id) => ({ id, innerHTML: '' }),
    querySelector: (sel) => ({ tagName: 'DIV' })
};
global.localStorage = {
    data: {},
    setItem: (k, v) => { global.localStorage.data[k] = v; },
    getItem: (k) => global.localStorage.data[k]
};

console.log(typeof window);                    // 'object' - 浏览器全局对象，包含所有浏览器 API

const el = document.getElementById('app');     // 通过 ID 获取页面元素（Node.js 中模拟）
console.log('Element:', el.id);

localStorage.setItem('key', 'value');          // 浏览器本地存储（Node.js 中模拟）
console.log('Stored value:', localStorage.getItem('key'));
