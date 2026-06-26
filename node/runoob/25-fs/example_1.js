/**
 * ============================================================
 * 章节: Node.js 文件系统
 * 文件: node/runoob/25-fs/example_1.js
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



// 异步读取

fs.readFile('input.txt', function (err, data) {

   if (err) {

       return console.error(err);

   }

   console.log("异步读取: " + data.toString());

});



// 同步读取

var data = fs.readFileSync('example.txt');

console.log("同步读取: " + data.toString());



console.log("程序执行完毕。");