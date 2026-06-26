/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_11.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 回调地狱示例：多个异步操作需要顺序执行时，回调会不断嵌套，代码可读性极差

const fs = require('fs');

fs.readFile('file.txt', (err, data1) => {

    if (err) throw err;

    fs.readFile('data.txt', (err, data2) => {   // 嵌套第一层

        if (err) throw err;

        fs.readFile('input.txt', (err, data3) => {   // 嵌套第二层

            if (err) throw err;

            // 实际项目中这种嵌套可能有十几层，严重影响代码维护性

            console.log('所有文件读取完成');

        });

    });

});


// 对比：Promise 链式写法（现代 Node.js 推荐）

const fsPromises = require('fs').promises;

async function readFiles() {

    try {

        const data1 = await fsPromises.readFile('file.txt');

        const data2 = await fsPromises.readFile('data.txt');

        const data3 = await fsPromises.readFile('input.txt');

        console.log('所有文件读取完成');

    } catch (err) {

        console.error(err);

    }

}

readFiles();
