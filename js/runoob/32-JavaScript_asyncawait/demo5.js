// ============================================================
// 【第 32 节 · JavaScript async/await】demo5.js
// ============================================================
//
// 【知识点 / 后端类比】
//   用同步写法写异步代码(语法糖，基于 Promise)。async 函数返回 Promise，await 等待 Promise。
//   后端类比：让异步代码看起来像同步，≈ C# 的 async/await，极大提升可读性。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
    async function fetchData() {  // async 函数：返回 Promise，内部可用 await
const result = await somePromise;  // 等待 Promise 完成（让异步代码像同步一样写）
console.log(result);  // 输出到浏览器控制台（≈ 后端的 print/println）
}
