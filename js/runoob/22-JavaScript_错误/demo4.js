// ============================================================
// 【第 22 节 · JavaScript 错误】demo4.js
// ============================================================
//
// 【知识点 / 后端类比】
//   try/catch/finally/throw 异常处理。
//   后端类比：≈ Java 异常机制，但 JS 【只有一个 catch(无类型)】，不像 Java catch 具体异常类型；JS 也没有“检查异常”概念。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function myFunction() {  // 函数声明（会提升 hoisting）
var message, x;  // var 声明（函数作用域、会提升，推荐改用 let/const）
    message = document.getElementById("message");  // 按 id 查找 DOM 元素（id≈主键），返回该节点
    message.innerHTML = "";  // 设置元素内部 HTML 内容（会重新解析 HTML）
    x = document.getElementById("demo").value;  // 按 id 查找 DOM 元素（id≈主键），返回该节点
try {  // try 块：捕获可能出错的代码
    if(x == "") throw "值为空";  // 抛出异常（≈ 后端的 throw）
    if(isNaN(x)) throw "不是数字";  // 抛出异常（≈ 后端的 throw）
    x = Number(x);
    if(x < 5) throw "太小";  // 抛出异常（≈ 后端的 throw）
    if(x > 10) throw "太大";  // 抛出异常（≈ 后端的 throw）
}
catch(err) {  // 捕获异常（JS 只有一个 catch，不区分异常类型）
    message.innerHTML = "错误: " + err;  // 设置元素内部 HTML 内容（会重新解析 HTML）
}
}
