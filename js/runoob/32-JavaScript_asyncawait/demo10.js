// ============================================================
// 【第 32 节 · JavaScript async/await】demo10.js
// ============================================================
//
// 【知识点 / 后端类比】
//   用同步写法写异步代码(语法糖，基于 Promise)。async 函数返回 Promise，await 等待 Promise。
//   后端类比：让异步代码看起来像同步，≈ C# 的 async/await，极大提升可读性。
//
//   【注意】本文件含教学伪代码/占位示意文字，非可直接运行程序。
//
// 不必要 - 函数内部没有 await
    async function unnecessaryAsync() {  // async 函数：返回 Promise，内部可用 await
return 42;  // 返回值给调用方（和后端 return 一致）
}

// 更简单的写法
function simpleFunction() {  // 函数声明（会提升 hoisting）
return 42;  // 返回值给调用方（和后端 return 一致）
}
