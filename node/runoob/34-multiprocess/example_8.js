/**
 * ============================================================
 * 章节: Node.js 多进程
 * 文件: node/runoob/34-multiprocess/example_8.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 摘要示例（在 cluster.isPrimary 分支里）

process.on('SIGUSR2', async () => {

  console.log('收到 SIGUSR2，开始优雅重启');

  const workers = Object.values(cluster.workers ?? {});

  // 1) 启新

  const fresh = cluster.fork();

  await new Promise(r => fresh.once('listening', r));

  // 2) 逐个下线旧的

  for (const w of workers) {

    w?.disconnect();

    // 超时还没退就强杀

    setTimeout(() => w?.process.kill('SIGKILL'), 5000);

  }

});