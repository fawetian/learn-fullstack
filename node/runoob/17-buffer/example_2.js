/**
 * ============================================================
 * 章节: Node.js Buffer
 * 文件: node/runoob/17-buffer/example_2.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 创建一个长度为 10、且用 0 填充的 Buffer。

const buf1 = Buffer.alloc(10);



// 创建一个长度为 10、且用 0x1 填充的 Buffer。 

const buf2 = Buffer.alloc(10, 1);



// 创建一个长度为 10、且未初始化的 Buffer。

// 这个方法比调用 Buffer.alloc() 更快，

// 但返回的 Buffer 实例可能包含旧数据，

// 因此需要使用 fill() 或 write() 重写。

const buf3 = Buffer.allocUnsafe(10);



// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。

const buf4 = Buffer.from([1, 2, 3]);



// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。

const buf5 = Buffer.from('tést');



// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。

const buf6 = Buffer.from('tést', 'latin1');