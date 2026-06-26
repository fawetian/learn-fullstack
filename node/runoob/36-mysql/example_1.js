/**
 * ============================================================
 * 章节: Node.js MySQL
 * 文件: node/runoob/36-mysql/example_1.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test'
});

try {
  connection.connect();
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) {
      console.error('MySQL query error:', error.message);
      return;
    }
    console.log('The solution is: ', results[0].solution);
  });
} catch (err) {
  console.error('MySQL connection error:', err.message);
}

// 自动退出（避免连接超时）
setTimeout(() => {
  console.log('MySQL demo completed');
  try { connection.end(); } catch(e) {}
  process.exit(0);
}, 500);
