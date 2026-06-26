/**
 * ============================================================
 * 章节: Node.js 第一个应用
 * 文件: node/runoob/06-first-app/example_1.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

var http = require('http');



http.createServer(function (request, response) {



        // 发送 HTTP 头部 

        // HTTP 状态值: 200 : OK

        // 内容类型: text/plain

        response.writeHead(200, {'Content-Type': 'text/plain'});



        // 发送响应数据 "Hello World"

        response.end('Hello World\n');

}).listen(8888);



// 终端打印如下信息

console.log('Server running at http://127.0.0.1:8888/');

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
