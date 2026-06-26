/**
 * ============================================================
 * 章节: Node.js 多进程
 * 文件: node/runoob/34-multiprocess/example_11.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// pool/demo.js
const { ProcessPool } = require('./pool/index.js');

async function main() {
    const pool = new ProcessPool({ file: './pool/worker.js', size: 4 });

    const tasks = Array.from({ length: 10 }, (_, i) => pool.runTask({ n: 10 + (i % 3) }));

    const t0 = Date.now();
    const results = await Promise.all(tasks);
    console.log('结果:', results);
    console.log('耗时(ms):', Date.now() - t0);

    await new Promise(r => setTimeout(r, 100)); // 等待消息刷完
    pool.close();
}

main().then(() => process.exit(0));
