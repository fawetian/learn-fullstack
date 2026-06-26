/**
 * ============================================================
 * 章节: Node.js 开发流程
 * 文件: node/runoob/07-workflow/example_3.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const cluster = require('cluster');

const http = require('http');

const numCPUs = require('os').cpus().length;



if (cluster.isMaster) {

  // 主进程 fork 工作进程

  for (let i = 0; i < numCPUs; i++) {

    cluster.fork();

  }

} else {

  // 工作进程创建HTTP服务器

  http.createServer((req, res) => {

    res.writeHead(200);

    res.end('你好世界\n');

  }).listen(8000);

}

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
