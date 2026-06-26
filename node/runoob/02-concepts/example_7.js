/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_7.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

console.log(__dirname);   // 当前模块所在目录的绝对路径，例如：/home/user/project

console.log(__filename);  // 当前模块文件的绝对路径，例如：/home/user/project/app.js

console.log(process);     // 进程对象，可读取命令行参数（process.argv）、环境变量（process.env）等

console.log(Buffer);      // 用于处理二进制数据的构造函数，常用于文件读写和网络通信