/**
 * ============================================================
 * 章节: Node.js 路由
 * 文件: node/runoob/22-router/example_1.js
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



// 创建服务器并定义路由

const server = http.createServer((req, res) => {

  const { url, method } = req;



  if (url === '/' && method === 'GET') {

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.end('Home Page');

  } else if (url === '/about' && method === 'GET') {

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.end('About Page');

  } else {

    res.writeHead(404, { 'Content-Type': 'text/plain' });

    res.end('404 Not Found');

  }

});



server.listen(3000, () => {

  console.log('Server is running on http://localhost:3000');

});

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
