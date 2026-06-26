// ============================================================
// 【第 07 节 · JavaScript 变量】demo6.js
// ============================================================
//
// 【知识点 / 后端类比】
//   用 var/let/const 声明变量，JS 是【弱类型/动态类型】——同一变量可存不同类型。
//   后端类比(重点坑)：JS 变量【没有类型声明】，不像 Java int x=1; 而是 var x=1; 之后还能 x='a'。
//   var 只有函数作用域(无块作用域)；let/const(ES6) 才有块作用域。推荐用 let/const。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
var carname="Volvo";  // var 声明（函数作用域、会提升，推荐改用 let/const）
document.getElementById("demo").innerHTML=carname;  // 按 id 查找 DOM 元素（id≈主键），返回该节点
