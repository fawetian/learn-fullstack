/**
 * ============================================================
 * 章节: Node.js 第一个应用
 * 文件: node/runoob/06-first-app/client.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 引入 Node.js 内置的 http 模块
const http = require('http');  // 引入 Node.js 内置 http 模块，提供 HTTP 服务器和客户端功能

// 使用 http.get() 发送 GET 请求到本地服务器
// 参数 options 可以包含 hostname, port, path, headers 等
http.get('http://localhost:8888/', (res) => {
  // 回调函数在服务器响应开始到达时执行
  // res 是 IncomingMessage 对象，是一个可读流（Readable Stream）

  // 获取并打印 HTTP 响应状态码（如 200, 404, 500）
  console.log('状态码:', res.statusCode);  // 设置 HTTP 响应状态码，200 表示请求成功

  // 获取并打印响应头信息
  console.log('响应头:', JSON.stringify(res.headers, null, 2));  // 在控制台输出信息，用于调试和日志记录

  // 声明变量用于拼接所有响应数据块
  let data = '';

  // 监听 'data' 事件：每当从服务器接收到一块数据时触发
  // 数据可能分多次传输，通过拼接获得完整内容
  res.on('data', (chunk) => {  // 注册事件监听器，当指定事件触发时执行回调函数
    data += chunk;
    // 打印当前接收到的数据块（Buffer 对象），展示流式传输特性
    console.log('接收到数据块:', chunk.toString());  // 在控制台输出信息，用于调试和日志记录
  });

  // 监听 'end' 事件：当所有数据块接收完毕时触发
  res.on('end', () => {  // 注册事件监听器，当指定事件触发时执行回调函数
    console.log('响应数据接收完毕');  // 在控制台输出信息，用于调试和日志记录
    console.log('完整响应内容:', data);  // 在控制台输出信息，用于调试和日志记录
  });

}).on('error', (err) => {  // 注册事件监听器，当指定事件触发时执行回调函数
  // 监听请求错误事件，如网络连接失败、DNS 解析失败等
  console.error('请求失败:', err.message);  // 在控制台输出错误信息，stderr 流
});
