/**
 * ============================================================
 * 章节: Node.js 模块系统
 * 文件: node/runoob/19-module-system/hello.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// hello.js - 同时支持对象和构造函数两种用法
function Hello(name) {
  this.name = name || 'World';
}

Hello.prototype.world = function() {
  console.log('Hello World');
};

Hello.prototype.setName = function(name) {
  this.name = name;
};

Hello.prototype.sayHello = function() {
  console.log('Hello, ' + this.name);
};

// 同时导出一个可以直接使用的对象
Hello.world = function() {
  console.log('Hello World');
};

module.exports = Hello;
