/**
 * ============================================================
 * 章节: Node.js 工具模块
 * 文件: node/runoob/30-util-module/example_9.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 旧的回调风格代码

const util = require('util');
function oldStyleFunc(param, callback) {

  // 一些异步操作

  setTimeout(() => {

    callback(null, `Result for ${param}`);

  }, 100);

}



// 转换为 Promise 风格

const newStyleFunc = util.promisify(oldStyleFunc);



async function useNewStyle() {

  const result = await newStyleFunc('test');

  console.log(result); // Result for test

}



useNewStyle();