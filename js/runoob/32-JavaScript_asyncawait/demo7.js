// ============================================================
// 【第 32 节 · JavaScript async/await】demo7.js
// ============================================================
//
// 【知识点 / 后端类比】
//   用同步写法写异步代码(语法糖，基于 Promise)。async 函数返回 Promise，await 等待 Promise。
//   后端类比：让异步代码看起来像同步，≈ C# 的 async/await，极大提升可读性。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
    async function fetchUserData() {  // async 函数：返回 Promise，内部可用 await
try {  // try 块：捕获可能出错的代码
    const response = await fetch('https://api.example.com/user');
if (!response.ok) {  // if 条件分支
throw new Error('网络响应不正常');  // new 调用构造函数创建对象（≈ 后端的 new）
}
const data = await response.json();  // 等待 Promise 完成（让异步代码像同步一样写）
console.log(data);  // 输出到浏览器控制台（≈ 后端的 print/println）
} catch (error) {  // 捕获异常（JS 只有一个 catch，不区分异常类型）
console.error('获取数据失败:', error);
}
}
