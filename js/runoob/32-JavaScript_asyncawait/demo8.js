// ============================================================
// 【第 32 节 · JavaScript async/await】demo8.js
// ============================================================
//
// 【知识点 / 后端类比】
//   用同步写法写异步代码(语法糖，基于 Promise)。async 函数返回 Promise，await 等待 Promise。
//   后端类比：让异步代码看起来像同步，≈ C# 的 async/await，极大提升可读性。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
    async function fetchMultipleData() {  // async 函数：返回 Promise，内部可用 await
const [userData, productData] = await Promise.all([  // Promise：表示异步操作最终结果（≈ CompletableFuture）
    fetch('/api/user'),  // 现代异步请求 API（Promise 风格，替代 XMLHttpRequest）
    fetch('/api/products')  // 现代异步请求 API（Promise 风格，替代 XMLHttpRequest）
    ]);

const user = await userData.json();  // 等待 Promise 完成（让异步代码像同步一样写）
const products = await productData.json();  // 等待 Promise 完成（让异步代码像同步一样写）

return { user, products };  // 返回值给调用方（和后端 return 一致）
}
