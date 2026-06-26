// ============================================================
// 【第 48 节 · JavaScript RegExp】demo6.js
// ============================================================
//
// 【知识点 / 后端类比】
//   正则：/pattern/flags 或 new RegExp。test/exec 方法。
//   后端类比：和后端正则(Python re、Java Pattern、Go regexp)语法通用。g 全局、i 忽略大小写。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
var str="Is this all there is?";  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
var patt1=/is/gi;  // var 声明（函数作用域、会提升，推荐改用 let/const）
