/**
 * ============================================================
 * 章节: Node.js Web 模块
 * 文件: node/runoob/31-web-module/example_3.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

var http = require('http');

// 用于请求的选项（改为模拟本地服务器，避免连接失败）
var options = {
   host: 'localhost',
   port: '8080',
   path: '/index.html'  
};

// 处理响应的回调函数
var callback = function(response){
   // 不断更新数据
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // 数据接收完成
      console.log(body);
   });
}

// 向服务端发送请求
var req = http.request(options, callback);

// 添加错误处理（避免未捕获的异常）
req.on('error', function(err) {
   console.log('HTTP request error (expected):', err.message);
});

req.end();

// 自动退出（仅用于演示）
setTimeout(() => process.exit(0), 200);
