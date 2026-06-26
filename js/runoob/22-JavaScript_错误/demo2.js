// ============================================================
// 【第 22 节 · JavaScript 错误】demo2.js
// ============================================================
//
// 【知识点 / 后端类比】
//   try/catch/finally/throw 异常处理。
//   后端类比：≈ Java 异常机制，但 JS 【只有一个 catch(无类型)】，不像 Java catch 具体异常类型；JS 也没有“检查异常”概念。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
var txt="";  // var 声明（函数作用域、会提升，推荐改用 let/const）
function message()  // 函数声明（会提升 hoisting）
{
try {  // try 块：捕获可能出错的代码
    adddlert("Welcome guest!");
} catch(err) {  // 捕获异常（JS 只有一个 catch，不区分异常类型）
    txt="本页有一个错误。\n\n";
    txt+="错误描述：" + err.message + "\n\n";
    txt+="点击确定继续。\n\n";
alert(txt);  // 浏览器弹窗（模态、阻塞），调试用，正式项目少用
}
}
