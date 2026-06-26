/**
 * ============================================================
 * 章节: Node.js 路由
 * 文件: node/runoob/22-router/server.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// server.js - 简单的 HTTP 服务器
const http = require('http');
const url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');
    route(handle, pathname, response);
  }

  const server = http.createServer(onRequest);
  server.listen(3000, () => {
    console.log('Server has started on port 3000');
  });
  
  // 自动退出（仅用于演示）
  setTimeout(() => {
    server.close();
    console.log('Server demo completed');
    process.exit(0);
  }, 300);
}

exports.start = start;
