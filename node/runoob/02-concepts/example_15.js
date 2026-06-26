/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_15.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// HTTP 反向代理服务器示例

// 将前端发来的 /api/xxx 请求转发到后端真实 API 服务器，隐藏真实地址，常用于解决跨域问题

// 首先需要安装：npm install http-proxy-middleware

const httpProxy = require('http-proxy-middleware');

const proxy = httpProxy.createProxyMiddleware({
    target: 'http://api.example.com',  // 真实后端 API 服务器地址
    changeOrigin: true,                 // 修改请求头中的 Host 为 target 地址
    pathRewrite: {
        '^/api': ''                     // 将路径中的 /api 前缀去掉再转发，例如 /api/users → /users
    }
});

console.log('HTTP proxy middleware demo created');
