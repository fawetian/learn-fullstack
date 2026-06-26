// ============================================================
// 【第 32 节 · JavaScript async/await】demo3.js
// ============================================================
//
// 【知识点 / 后端类比】
//   用同步写法写异步代码(语法糖，基于 Promise)。async 函数返回 Promise，await 等待 Promise。
//   后端类比：让异步代码看起来像同步，≈ C# 的 async/await，极大提升可读性。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
function getData() {  // 函数声明（会提升 hoisting）
return new Promise((resolve, reject) => {  // new 调用构造函数创建对象（≈ 后端的 new）
// 异步操作
    setTimeout(() => resolve('数据'), 1000);  // 延迟指定毫秒后【执行一次】回调（异步，不阻塞）
});
}

    getData()
    .then(data => {  // Promise 成功的回调
console.log(data);  // 输出到浏览器控制台（≈ 后端的 print/println）
return getMoreData(data);  // 返回值给调用方（和后端 return 一致）
})
    .then(moreData => {  // Promise 成功的回调
console.log(moreData);  // 输出到浏览器控制台（≈ 后端的 print/println）
})
    .catch(error => {  // Promise 失败的回调
console.error(error);
});
