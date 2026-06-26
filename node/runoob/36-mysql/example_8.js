/**
 * ============================================================
 * 章节: Node.js MySQL
 * 文件: node/runoob/36-mysql/example_8.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// MySQL UPDATE 示例

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
});

// 添加错误监听器（避免未捕获的异常）
connection.on('error', (err) => {
    console.error('MySQL error (expected):', err.message);
});

// SQL UPDATE 语句示例
const sql = "UPDATE users SET name = ? WHERE id = ?";
console.log('SQL:', sql);
console.log('Note: Requires active MySQL connection to execute');

// 安全关闭连接
try {
    connection.destroy();
} catch (err) {
    console.error('MySQL error:', err.message);
}

// 自动退出（仅用于演示）
setTimeout(() => process.exit(0), 100);
