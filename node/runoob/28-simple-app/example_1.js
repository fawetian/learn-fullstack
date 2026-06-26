/**
 * ============================================================
 * 章节: Node.js 简单应用
 * 文件: node/runoob/28-simple-app/example_1.js
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



// 创建服务器

const server = http.createServer((req, res) => {

  // 设置HTTP响应的状态码和头信息

  res.writeHead(200, {

    // 设置内容类型为 HTML，并指定字符集为 UTF-8，这样中文不会乱码

    'Content-Type': 'text/html; charset=utf-8' 

  });



  // 发送响应体

  res.end('<h1>Hello, World!</h1><p>这是我的第一个 Node.js 应用。</p>');

});



// 监听端口

const PORT = 3000;

server.listen(PORT, () => {

  console.log(`Server is running on http://localhost:${PORT}`);

});

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
