/**
 * ============================================================
 * 章节: Node.js 路由
 * 文件: node/runoob/22-router/example_4.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// server.js
const http = require("http"); // 引入 Node.js 的 http 模块，用于创建服务器
const { URL } = require("url"); // 从 url 模块引入 URL 构造函数
 
// 定义并导出 start 函数，用于启动服务器
function start(route) {
  // 定义 onRequest 函数，处理每个请求
  function onRequest(request, response) {
    // 使用 URL 构造函数解析请求路径
    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
    console.log(`Request for ${pathname} received.`); // 打印请求路径
 
    route(pathname); // 调用路由函数处理路径
 
    // 设置响应头和响应内容
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
  }
 
  // 创建服务器并监听指定端口
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
 
// 导出 start 函数供其他模块使用
module.exports.start = start;

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
