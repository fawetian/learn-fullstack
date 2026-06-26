/**
 * ============================================================
 * 章节: Node.js Stream
 * 文件: node/runoob/18-stream/example_5.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const fs = require('fs');



// 创建一个可读流

var readerStream = fs.createReadStream('input.txt');



// 创建一个可写流

var writerStream = fs.createWriteStream('output.txt');



// 管道读写操作

// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中

readerStream.pipe(writerStream);



console.log("程序执行完毕");