/**
 * ============================================================
 * 章节: Node.js MongoDB
 * 文件: node/runoob/37-mongodb/example_21.js
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
 
// MongoDB 连接 URI
const uri = "mongodb://localhost:27017"; // 请根据你的 MongoDB 服务器地址进行修改
 
// 创建一个新的 MongoClient
const client = new MongoClient(uri  );
 
// 使用 Promise 封装连接数据库的过程
function connectDB() {
    return new Promise((resolve, reject) => {
        // 连接到 MongoDB 服务器
        client.connect((err) => {
            if (err) {
                reject(err);
            } else {
                console.log("成功连接到 MongoDB 服务器");
                resolve(client.db()); // 返回数据库实例
            }
        });
    });
}
 
// 使用示例
connectDB()
    .then(database => {
        // 这里可以继续执行数据库操作
        console.log("连接到数据库成功");
 
        // 示例：输出数据库的名称
        console.log("数据库名称:", database.databaseName);
 
        // 如果需要进行其他操作，可以在这里继续编写代码
        // 比如查询、插入文档等
 
        // 最后关闭连接
        client.close();
    })
    .catch(err => {
        console.error("连接数据库时发生错误:", err);
    });

// 自动退出（避免连接超时）
setTimeout(() => {
    console.log('MongoDB demo completed');
    process.exit(0);
}, 500);
