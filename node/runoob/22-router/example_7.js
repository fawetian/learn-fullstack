/**
 * ============================================================
 * 章节: Node.js 路由
 * 文件: node/runoob/22-router/example_7.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 路由参数示例

const express = require('express');
const app = express();

app.get('/users/:id', (req, res) => {
    console.log('User ID:', req.params.id);
    res.json({ id: req.params.id, name: 'User ' + req.params.id });
});

// 测试路由（不启动服务器）
console.log('Route defined: GET /users/:id');
console.log('Test: /users/123 -> id=123');
