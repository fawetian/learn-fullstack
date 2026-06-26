/**
 * ============================================================
 * 章节: Node.js 路由
 * 文件: node/runoob/22-router/example_6.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const express = require('express');

const app = express();

const port = 3000;



// 定义一个 GET 路由

app.get('/', (req, res) => {

    res.send('Hello, World!');

});



// 定义一个 POST 路由

app.post('/submit', (req, res) => {

    res.send('Form submitted!');

});



// 启动服务器

app.listen(port, () => {

    console.log(`Server is running on http://localhost:${port}`);

});

// 自动关闭（仅用于演示）
setTimeout(() => {
    console.log('Express demo completed');
    process.exit(0);
}, 100);
