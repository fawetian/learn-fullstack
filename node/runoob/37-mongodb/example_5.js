/**
 * ============================================================
 * 章节: Node.js MongoDB
 * 文件: node/runoob/37-mongodb/example_5.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// MongoDB 示例

const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        console.log('Collection exampleCollection created');
    } catch (err) {
        console.error('MongoDB connection failed (expected if not running):', err.message);
    } finally {
        try { await client.close(); } catch (e) { /* ignore */ }
    }
}

main();

// 自动退出（避免连接超时）
setTimeout(() => {
    console.log('MongoDB demo completed');
    process.exit(0);
}, 500);
