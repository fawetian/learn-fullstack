/**
 * ============================================================
 * 章节: Node.js 回调函数
 * 文件: node/runoob/12-callback/example_4.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const fs = require('fs').promises;



async function readFiles() {

    try {

        const data1 = await fs.readFile('file1.txt', 'utf8');

        const data2 = await fs.readFile('file2.txt', 'utf8');

        const data3 = await fs.readFile('file3.txt', 'utf8');



        console.log('Data from all files:', data1, data2, data3);

    } catch (err) {

        console.error('Error reading files:', err);

    }

}



readFiles();