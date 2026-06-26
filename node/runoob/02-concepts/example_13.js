/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_13.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 使用 Express 框架搭建 RESTful API 服务

// 首先需要安装 express：npm install express

const express = require('express');

const app = express();



app.use(express.json());  // 中间件：自动解析请求体中的 JSON 数据



// GET 请求：获取用户列表（对应 HTTP 方法 GET，路径 /api/users）

app.get('/api/users', (req, res) => {

    const users = [

        { id: 1, name: '张三' },

        { id: 2, name: '李四' }

    ];

    res.json(users);  // 以 JSON 格式返回数据

});



// POST 请求：创建新用户（客户端在请求体中传入用户信息）

app.post('/api/users', (req, res) => {

    const newUser = req.body;          // 获取客户端发来的 JSON 数据

    // 实际项目中这里通常会将用户信息保存到数据库

    res.status(201).json({ message: '用户创建成功', user: newUser });

});



// PUT 请求：更新指定用户信息（:id 是路由参数，如 /api/users/1 表示更新 ID 为 1 的用户）

app.put('/api/users/:id', (req, res) => {

    const { id } = req.params;         // 从路径中获取用户 ID

    const updatedData = req.body;      // 从请求体中获取更新内容

    res.json({ message: `用户 ${id} 更新成功`, data: updatedData });

});



// DELETE 请求：删除指定用户

app.delete('/api/users/:id', (req, res) => {

    const { id } = req.params;

    res.json({ message: `用户 ${id} 删除成功` });

});



app.listen(3000, () => {

    console.log('API 服务器运行在 http://localhost:3000/');

});

// 自动关闭（仅用于演示）
setTimeout(() => {
    console.log('Express demo completed');
    process.exit(0);
}, 100);
