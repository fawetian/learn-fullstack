/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_2.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// Node.js 异步操作

const fs = require('fs');



// 三个读文件的操作几乎同时发出，程序不会等待任何一个完成

fs.readFile('file1.txt', (err, data1) => {

    // 这个回调函数会在 file1.txt 读取完成后自动被调用

    console.log('文件1读取完成');

});



fs.readFile('file2.txt', (err, data2) => {

    // 这个回调函数会在 file2.txt 读取完成后自动被调用

    console.log('文件2读取完成');

});



fs.readFile('file3.txt', (err, data3) => {

    // 这个回调函数会在 file3.txt 读取完成后自动被调用

    console.log('文件3读取完成');

});



// 注意：这行代码会最先执行！因为上面三个读文件操作是异步的，

// 发出读取请求后程序立刻继续往下走，不会等待文件读取完成

console.log('程序继续执行，不等待文件读取');



// 实际输出顺序示例：

// 程序继续执行，不等待文件读取   ← 最先打印

// 文件2读取完成                  ← 哪个文件先读完就先打印，顺序不固定

// 文件1读取完成

// 文件3读取完成

// 总耗时 ≈ 三个文件中读取最慢的那一个的时间（并发执行，而非顺序叠加）