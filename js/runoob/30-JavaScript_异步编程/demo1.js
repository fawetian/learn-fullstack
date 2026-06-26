// ============================================================
// 【第 30 节 · JavaScript 异步编程】demo1.js
// ============================================================
//
// 【知识点 / 后端类比】
//   JS 单线程 + 事件循环，异步靠回调/Promise/async。setTimeout 延迟执行。
//   后端类比(重要)：JS 不像后端用多线程并发，而是【单线程事件循环】+ 非阻塞 IO。
//   回调函数：延迟/请求完成后【未来某刻】被调用，类似注册一个回调。XMLHttpRequest 是老式 AJAX。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function print() {  // 函数声明（会提升 hoisting）
document.getElementById("demo").innerHTML="RUNOOB!";  // 按 id 查找 DOM 元素（id≈主键），返回该节点
}
    setTimeout(print, 3000);  // 延迟指定毫秒后【执行一次】回调（异步，不阻塞）
