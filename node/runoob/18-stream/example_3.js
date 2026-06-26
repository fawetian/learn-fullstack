/**
 * ============================================================
 * 章节: Node.js Stream
 * 文件: node/runoob/18-stream/example_3.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const net = require('net');



// 创建一个 TCP 服务器

const server = net.createServer((socket) => {

    console.log('Client connected.');



    // 读取客户端数据

    socket.on('data', (data) => {

        console.log('Received data:', data.toString());

    });



    // 向客户端发送数据

    socket.write('Hello, Client!\n');



    // 监听关闭事件

    socket.on('end', () => {

        console.log('Client disconnected.');

    });

});



server.listen(3000, () => {

    console.log('Server listening on port 3000.');

});

// 自动退出（仅用于演示）
setTimeout(() => process.exit(0), 100);
