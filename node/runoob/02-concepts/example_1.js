/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_1.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 伪代码 - 阻塞式操作

// 每次 readFileSync 都会"卡住"程序，等待文件读取完成后才继续往下执行

const { readFileSync } = require('fs');
const data1 = readFileSync('file.txt');  // 程序在此暂停，等待文件读取完成

const data2 = readFileSync('data.txt');  // data1 读完后，再暂停等待

const data3 = readFileSync('input.txt');  // data2 读完后，再暂停等待

console.log('所有文件读取完成');          // 三个文件全部读完后才执行到这里

// 总耗时 = 读取file1的时间 + 读取file2的时间 + 读取file3的时间
