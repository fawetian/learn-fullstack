// ============================================================
// 【第 59 节 · JavaScript 测试 Prototype】demo2.js
// ============================================================
//
// 【知识点 / 后端类比】
//   Prototype 库：早期框架，扩展原生对象。已过时，了解即可。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function myFunction()  // 函数声明（会提升 hoisting）
{
var obj=document.getElementById("h01");  // 按 id 查找 DOM 元素（id≈主键），返回该节点
    obj.innerHTML="Hello Prototype";  // 设置元素内部 HTML 内容（会重新解析 HTML）
}
    onload=myFunction;  // 加载完成事件
