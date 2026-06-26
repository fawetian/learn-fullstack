/**
 * ============================================================
 * 章节: Node.js ES6 模块
 * 文件: node/runoob/20-module-import/example_3.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// user.js

const name = 'Alice';

const age = 30;



// 方式一：使用 module.exports 导出单个对象或值

module.exports = {

  name: name,

  age: age,

  sayHello: () => {

    console.log(`Hello, my name is ${name}.`);

  }

};



// 方式二：使用 exports 导出多个具名变量

// exports 是 module.exports 的一个引用

exports.name = name;

exports.age = age;

exports.sayHello = () => {

  console.log(`Hello, my name is ${name}.`);

};