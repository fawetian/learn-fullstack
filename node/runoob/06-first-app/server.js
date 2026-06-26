/**
 * ============================================================
 * 章节: Node.js 第一个应用
 * 文件: node/runoob/06-first-app/server.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 引入 Node.js 内置的 http 模块，该模块提供了创建 HTTP 服务器和客户端的功能
const http = require('http');  // 引入 Node.js 内置 http 模块，提供 HTTP 服务器和客户端功能

// 定义服务器监听的端口号，使用 8888 端口
// 注意：在 Linux/macOS 上，端口号 < 1024 需要 root 权限
const PORT = 8888;

// 使用 http.createServer() 创建 HTTP 服务器
// 参数是一个回调函数（request listener），每当有新的请求到达时会被调用
// req（request）对象：包含请求的所有信息（URL、方法、头部、数据等）
// res（response）对象：用于向客户端发送响应
const server = http.createServer((req, res) => {  // 使用 http.createServer() 创建 HTTP 服务器，回调函数处理每个请求
  // 设置 HTTP 响应状态码为 200，表示请求成功
  // 状态码 200 OK 是 HTTP 协议中最常见的成功状态码
  res.statusCode = 200;  // 设置 HTTP 响应状态码，200 表示请求成功

  // 设置响应头部，Content-Type 告诉浏览器返回内容的类型
  // text/plain; charset=utf-8 表示纯文本，使用 UTF-8 编码
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');  // 设置 HTTP 响应头部，如 Content-Type 指定返回内容类型

  // 结束响应并发送数据给客户端
  // res.end() 是写入响应体的最后一步，必须调用，否则客户端会一直等待
  res.end('Hello, Node.js! 这是你的第一个 HTTP 服务器\n');  // 结束响应并发送数据给客户端，必须调用否则客户端一直等待
});

// 调用 server.listen() 让服务器开始监听指定的端口
// 服务器启动后会进入事件循环，等待客户端连接和请求
server.listen(PORT, () => {  // 启动服务器监听指定端口，服务器开始接收客户端请求
  // 回调函数在服务器成功启动后执行，用于确认服务器状态
  console.log(`服务器运行在 http://localhost:${PORT}/`);  // 在控制台输出信息，用于调试和日志记录
  console.log('按 Ctrl+C 终止服务器');  // 在控制台输出信息，用于调试和日志记录
});

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
