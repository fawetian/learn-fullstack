// ============================================================
// 【第 32 节 · JavaScript async/await】demo9.js
// ============================================================
//
// 【知识点 / 后端类比】
//   用同步写法写异步代码(语法糖，基于 Promise)。async 函数返回 Promise，await 等待 Promise。
//   后端类比：让异步代码看起来像同步，≈ C# 的 async/await，极大提升可读性。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
// 错误示例 - 忘记 await
    async function example() {  // async 函数：返回 Promise，内部可用 await
    const data = fetch('/api'); // 缺少 await
    console.log(data); // 输出 Promise 对象
}

// 正确示例
    async function example() {  // async 函数：返回 Promise，内部可用 await
const data = await fetch('/api');  // 现代异步请求 API（Promise 风格，替代 XMLHttpRequest）
    console.log(data); // 输出实际数据
}
