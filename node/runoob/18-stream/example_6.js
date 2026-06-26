/**
 * ============================================================
 * 章节: Node.js Stream
 * 文件: node/runoob/18-stream/example_6.js
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

var zlib = require('zlib');



// 压缩 input.txt 文件为 input.txt.gz

fs.createReadStream('input.txt')

  .pipe(zlib.createGzip())

  .pipe(fs.createWriteStream('input.txt.gz'));

  

console.log("文件压缩完成。");