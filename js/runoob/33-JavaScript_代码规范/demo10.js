// ============================================================
// 【第 33 节 · JavaScript 代码规范】demo10.js
// ============================================================
//
// 【知识点 / 后端类比】
//   命名(驼峰)、缩进、分号、空格等编码规范。后端也都有各自的规范(如 Java 驼峰、Go gofmt)。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
document.getElementById("demo").innerHTML =  // 按 id 查找 DOM 元素（id≈主键），返回该节点
    "Hello Runoob.";
