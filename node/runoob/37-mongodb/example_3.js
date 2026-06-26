/**
 * ============================================================
 * 章节: Node.js MongoDB
 * 文件: node/runoob/37-mongodb/example_3.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const { MongoClient } = require('mongodb');
 
async function main() {
    // MongoDB 连接 URI
    const uri = "mongodb://localhost:27017"; // 请根据你的 MongoDB 服务器地址进行修改
 
    // 创建一个新的 MongoClient
    const client = new MongoClient(uri  );
 
    try {
        // 连接到 MongoDB 服务器
        await client.connect();
 
        console.log("成功连接到服务器");
 
        // 指定数据库
        const database = client.db('runoob');
 
        // 使用 createCollection 方法创建集合
        const collectionName = 'exampleCollection';
        await database.createCollection(collectionName);
        console.log(`集合 ${collectionName} 创建成功`);
 
        // 获取集合
        const collection = database.collection(collectionName);
 
        // 创建一个新文档
        const doc = { name: "Example", type: "Test" };
 
        // 插入文档到集合
        const result = await collection.insertOne(doc);
 
        console.log(`新文档已创建，ID 为: ${result.insertedId}`);
    } finally {
        // 确保在完成后关闭连接
        try { await client.close(); } catch (e) { /* ignore */ }
    }
}
 
main().catch(console.error);

// 自动退出（避免连接超时）
setTimeout(() => {
    console.log('MongoDB demo completed');
    process.exit(0);
}, 500);
