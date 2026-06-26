// ============================================================
// 【第 05 节 · JavaScript 语句】demo5.js
// ============================================================
//
// 【知识点 / 后端类比】
//   JS 语句以分号结尾（可省略但不推荐），按顺序执行，{ } 表示代码块。
//   后端类比：和 Java/C/Go 的语句概念一致；分号规则类似 Go（自动插入），但建议显式写分号。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function myFunction()  // 函数声明（会提升 hoisting）
{
document.getElementById("demo").innerHTML="你好Dolly";  // 按 id 查找 DOM 元素（id≈主键），返回该节点
document.getElementById("myDIV").innerHTML="你最近怎么样?";  // 按 id 查找 DOM 元素（id≈主键），返回该节点
}
