/**
 * ============================================================
 * 章节: Node.js GET/POST
 * 文件: node/runoob/29-get-post/example_4.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const http = require('http');



// 创建 HTTP 服务器

http.createServer((req, res) => {

    // 检查请求方法是否为 POST

    if (req.method === 'POST') {

        let body = '';



        // 监听 data 事件，逐块接收数据

        req.on('data', (chunk) => {

            body += chunk; // 累加接收到的数据块

        });



        // 监听 end 事件，数据接收完毕

        req.on('end', () => {

            // 输出接收到的 POST 数据

            console.log('Received POST data:', body);



            // 设置响应头和内容

            res.writeHead(200, { 'Content-Type': 'text/plain' });

            res.end('POST data received successfully!');

        });



    } else {

        // 非 POST 请求的处理

        res.writeHead(405, { 'Content-Type': 'text/plain' });

        res.end('Only POST requests are supported.');

    }



}).listen(3000, () => {

    console.log('Server is running at http://localhost:3000');

});

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
