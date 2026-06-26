/**
 * ============================================================
 * 章节: Node.js GET/POST
 * 文件: node/runoob/29-get-post/example_2.js
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
 
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
 
    // 使用 URL 构造函数解析请求 URL
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    
    // 获取查询参数
    const name = myUrl.searchParams.get("name");
    const siteUrl = myUrl.searchParams.get("url");
 
    res.write("网站名：" + (name || "未提供"));
    res.write("\n");
    res.write("网站 URL：" + (siteUrl || "未提供"));
    res.end();
 
}).listen(3000);
 
console.log("Server is running at http://localhost:3000");

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
