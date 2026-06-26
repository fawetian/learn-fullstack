/**
 * ============================================================
 * 章节: Node.js 路由
 * 文件: node/runoob/22-router/example_2.js
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
var url = require("url");
 
function start() {
  function onRequest(request, response) {
    // 使用 URL 构造函数解析请求路径
    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
    console.log(`Request for ${pathname} received.`); // 打印请求路径
    // 设置响应头和响应内容
    response.writeHead(200, { "Content-Type": "text/plain" }); // 设置状态码和内容类型
    response.write("Hello World"); // 向客户端发送响应内容
    response.end(); // 结束响应
  }
 
  // 创建服务器并监听指定端口
  http.createServer(onRequest).listen(8888);
  console.log("Server has started."); // 打印服务器启动消息
}
 
// 导出 start 函数供其他模块使用
module.exports.start = start;

// 自动退出（仅用于演示）
setTimeout(() => process.exit(0), 200);
