/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_14.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// WebSocket 实时聊天（使用 socket.io 库）

// 首先需要安装：npm install socket.io

const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);

// 监听客户端连接事件，每有新用户连接就触发一次
io.on('connection', (socket) => {
    // 监听当前连接的客户端发来的 'chat message' 事件
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);  // 将消息广播给所有在线客户端（包括发送者）
    });
});

console.log('Socket.io server demo (not started)');
