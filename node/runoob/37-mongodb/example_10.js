/**
 * ============================================================
 * 章节: Node.js MongoDB
 * 文件: node/runoob/37-mongodb/example_10.js
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
 
        // 创建多个新文档
        const docs = [
            { name: "Alice", age: 25, address: "Wonderland" },
            { name: "Bob", age: 30, address: "Builderland" },
            { name: "Charlie", age: 35, address: "Chocolate Factory" }
        ];
 
        // 插入多个文档到集合
        const result = await collection.insertMany(docs);
 
        console.log(`${result.insertedCount} 个新文档已创建，ID 为:`);
        Object.keys(result.insertedIds).forEach((id, index) => {
            console.log(`文档 ${index + 1}: ${id}`);
        });
 
        // 指定条件，根据 name 参数更新数据
        const filter = { name: "Alice" }; // 搜索条件
        const updateDoc = {
            $set: {
                age: 28,
                address: "New Wonderland"
            },
        };
 
        const updateResult = await collection.updateOne(filter, updateDoc);
 
        console.log(`${updateResult.matchedCount} 个文档匹配筛选条件`);
        console.log(`${updateResult.modifiedCount} 个文档已更新`);
 
        // 查询更新后的文档
        const updatedDocument = await collection.findOne(filter);
        console.log("更新后的文档:");
        console.log(updatedDocument);
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
