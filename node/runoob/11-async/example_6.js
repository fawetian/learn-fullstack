/**
 * ============================================================
 * 章节: Node.js 异步编程
 * 文件: node/runoob/11-async/example_6.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

const fs = require('fs');
async function processData() {

  try {

    const data = await fs.readFile('example.txt', 'utf8');

    const result = await someOtherAsyncOperation(data);

    console.log('最终结果:', result);

  } catch (err) {

    console.error('处理过程中出错:', err);

  }

}



processData();