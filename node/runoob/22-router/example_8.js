/**
 * ============================================================
 * 章节: Node.js 路由
 * 文件: node/runoob/22-router/example_8.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const express = require('express');

const app = express();

const port = 3000;



// 创建一个路由器实例

const userRouter = express.Router();



// 定义用户相关的路由

userRouter.get('/', (req, res) => {

    res.send('List of users');

});



userRouter.get('/:id', (req, res) => {

    const userId = req.params.id;

    res.send(`User ID: ${userId}`);

});



// 挂载用户路由器

app.use('/users', userRouter);



// 启动服务器

app.listen(port, () => {

    console.log(`Server is running on http://localhost:${port}`);

});

// 自动关闭（仅用于演示）
setTimeout(() => {
    console.log('Express demo completed');
    process.exit(0);
}, 100);
