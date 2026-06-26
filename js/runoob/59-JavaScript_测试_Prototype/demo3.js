// ============================================================
// 【第 59 节 · JavaScript 测试 Prototype】demo3.js
// ============================================================
//
// 【知识点 / 后端类比】
//   Prototype 库：早期框架，扩展原生对象。已过时，了解即可。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
function myFunction()  // 函数声明（会提升 hoisting）
{
    $("h01").insert("Hello Prototype!");  // jQuery 选择器/调用（$ 是 jQuery 的入口函数）
}
    Event.observe(window,"load",myFunction);
