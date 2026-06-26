/**
 * ============================================================
 * 章节: Node.js 多进程
 * 文件: node/runoob/34-multiprocess/example_12.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// app.js

const http = require('http');

const {  ProcessPool  } = require('./pool/index.js');



const pool = new ProcessPool({ file: './pool/worker.js', size: 4 });

const server = http.createServer(async (req, res) => {

  if (req.url?.startsWith('/fib?')) {

    const url = new URL(req.url, 'http://localhost');

    const n = Number(url.searchParams.get('n') || 35);

    try {

      const result = await pool.runTask({ n });

      res.writeHead(200, {'content-type': 'application/json'});

      res.end(JSON.stringify({ pid: process.pid, n, result }));

    } catch (e) {

      res.writeHead(500); res.end('error');

    }

  } else {

    res.writeHead(404).end('Not Found');

  }

});



server.listen(3000, () => console.log('http://localhost:3000'));

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
