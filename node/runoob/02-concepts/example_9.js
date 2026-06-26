/**
 * ============================================================
 * 章节: Node.js 基础概念
 * 文件: node/runoob/02-concepts/example_9.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// 输入验证和错误处理示例

function validateEmail(email) {
    return email.includes('@') && email.includes('.');
}

function processUserInput(userInput) {
    try {
        if (validateEmail(userInput)) {
            console.log('Email is valid:', userInput);
        } else {
            throw new Error('Invalid email format');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// 测试有效输入
processUserInput('user@example.com');
// 测试无效输入
processUserInput('invalid-email');
