// ============================================================
// 【第 06 节 · JavaScript 注释】demo1.js
// ============================================================
//
// 【知识点 / 后端类比】
//   单行 // 多行 /* */ ，和 Java/Go/C 完全一样。注释不会被解释器执行。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
// 输出标题：
document.getElementById("myH1").innerHTML="欢迎来到我的主页";  // 按 id 查找 DOM 元素（id≈主键），返回该节点
// 输出段落：
document.getElementById("myP").innerHTML="这是我的第一个段落。";  // 按 id 查找 DOM 元素（id≈主键），返回该节点
