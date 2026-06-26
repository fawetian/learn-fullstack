/**
 * ============================================================
 * 章节: Node.js MongoDB
 * 文件: node/runoob/37-mongodb/example_20.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.error('MongoDB connection error (expected):', err.message);
        return;
    }
    var dbo = db.db("runoob");
    // 删除 test 集合
    dbo.collection("test").drop(function(err, delOK) {
        if (err) {
            console.error('Drop collection error:', err.message);
        } else if (delOK) {
            console.log("集合已删除");
        }
        db.close();
    });
});

// 自动退出（避免连接超时）
setTimeout(() => {
    console.log('MongoDB demo completed');
    process.exit(0);
}, 500);
