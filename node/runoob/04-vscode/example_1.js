/**
 * ============================================================
 * 章节: Node.js VS Code 配置
 * 文件: node/runoob/04-vscode/example_1.js
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



const server = http.createServer((req, res) => {

  res.statusCode = 200;

  res.setHeader('Content-Type', 'text/plain');

  res.end(' RUNOOB Node Test ~ Hello, Node.js!\n');

});



const port = 3000;

server.listen(port, () => {

  console.log(`服务器运行地址：http://localhost:${port}/`);

});

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
