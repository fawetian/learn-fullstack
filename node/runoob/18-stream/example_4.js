/**
 * ============================================================
 * 章节: Node.js Stream
 * 文件: node/runoob/18-stream/example_4.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const zlib = require('zlib');

const fs = require('fs');



// 创建一个可读流

const readableStream = fs.createReadStream('example.txt');



// 创建一个转换流（压缩）

const gzip = zlib.createGzip();



// 创建一个可写流

const writableStream = fs.createWriteStream('example.txt.gz');



// 将可读流管道到转换流，再管道到可写流

readableStream.pipe(gzip).pipe(writableStream);



// 监听完成事件

writableStream.on('finish', () => {

    console.log('File compressed successfully.');

});