/**
 * ============================================================
 * 章节: Node.js 多进程
 * 文件: node/runoob/34-multiprocess/example_7.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// server-cluster.js

const os = require('os');
const http = require('http');
const cluster = require('node:cluster');



const {  pbkdf2Sync  } = require('crypto');



if (cluster.isPrimary) {

  const cpuCount = Math.max(1, os.cpus().length);

  console.log(`主进程 ${process.pid}，启动 ${cpuCount} 个工作进程`);

  for (let i = 0; i < cpuCount; i++) cluster.fork();



  cluster.on('exit', (worker, code) => {

    console.warn(`工作进程 ${worker.process.pid} 退出（code=${code}），重启中…`);

    cluster.fork();

  });

} else {

  const server = http.createServer((req, res) => {

    // 模拟 CPU 密集计算

    pbkdf2Sync('password', 'salt', 100_000, 64, 'sha512');

    res.writeHead(200, {'content-type':'text/plain; charset=utf-8'});

    res.end(`Handled by worker ${process.pid}\n`);

  });



  server.listen(3000, () => {

    console.log(`工作进程 ${process.pid} 监听 3000`);

  });

}

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
