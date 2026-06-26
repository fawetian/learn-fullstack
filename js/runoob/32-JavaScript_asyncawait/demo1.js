// ============================================================
// 【第 32 节 · JavaScript async/await】demo1.js
// ============================================================
//
// 【知识点 / 后端类比】
//   用同步写法写异步代码(语法糖，基于 Promise)。async 函数返回 Promise，await 等待 Promise。
//   后端类比：让异步代码看起来像同步，≈ C# 的 async/await，极大提升可读性。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
// 同步示例
console.log('1');  // 输出到浏览器控制台（≈ 后端的 print/println）
console.log('2');  // 输出到浏览器控制台（≈ 后端的 print/println）
// 输出: 1, 2

// 异步示例
console.log('1');  // 输出到浏览器控制台（≈ 后端的 print/println）
    setTimeout(() => console.log('2'), 0);  // 输出到浏览器控制台（≈ 后端的 print/println）
console.log('3');  // 输出到浏览器控制台（≈ 后端的 print/println）
// 输出: 1, 3, 2
