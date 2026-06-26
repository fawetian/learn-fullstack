/**
 * ============================================================
 * 章节: Node.js MongoDB
 * 文件: node/runoob/37-mongodb/example_19.js
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
        const database = client.db('mydatabase');
 
        // orders 集合
        const ordersCollection = database.collection('orders');
 
        // products 集合
        const productsCollection = database.collection('products');
 
        // 定义聚合管道，使用 $lookup 进行左外连接
        const pipeline = [
            {
                $lookup: {
                    from: 'products',         // 关联的集合名
                    localField: 'product_id', // 本地集合中用于关联的字段
                    foreignField: '_id',      // 关联集合中用于关联的字段
                    as: 'productDetails'      // 输出结果中包含的字段名
                }
            }
        ];
 
        // 执行聚合操作
        const result = await ordersCollection.aggregate(pipeline).toArray();
 
        // 输出查询结果
        console.log("左外连接查询结果:");
        console.log(result);
 
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
