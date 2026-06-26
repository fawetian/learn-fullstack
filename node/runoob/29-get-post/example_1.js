/**
 * ============================================================
 * 章节: Node.js GET/POST
 * 文件: node/runoob/29-get-post/example_1.js
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
const util = require('util');
 
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
 
    // 使用 URL 构造函数解析请求的 URL
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    
    // 输出 URL 的各个部分
    res.end(util.inspect({
        href: myUrl.href,
        origin: myUrl.origin,
        protocol: myUrl.protocol,
        host: myUrl.host,
        hostname: myUrl.hostname,
        port: myUrl.port,
        pathname: myUrl.pathname,
        search: myUrl.search,
        searchParams: Object.fromEntries(myUrl.searchParams) // 将 searchParams 转为普通对象
    }));
}).listen(3000);
 
console.log("Server is running at http://localhost:3000");

// 自动关闭服务器（仅用于演示）
setTimeout(() => {
    console.log('Server demo completed');
    process.exit(0);
}, 100);
