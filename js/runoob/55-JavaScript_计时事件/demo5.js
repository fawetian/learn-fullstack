// ============================================================
// 【第 55 节 · JavaScript 计时事件】demo5.js
// ============================================================
//
// 【知识点 / 后端类比】
//   setTimeout(延迟执行一次)、setInterval(重复执行)、clearTimeout/clearInterval 清除。
//   后端类比：≈ 定时任务/定时器(cron、Java Timer)，但这里返回 id 用于取消。注意 this 在回调里常丢失。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
var myVar;  // var 声明（函数作用域、会提升，推荐改用 let/const）

function myFunction()  // 函数声明（会提升 hoisting）
{
    myVar=setTimeout(function(){alert("Hello")},3000);  // 浏览器弹窗（模态、阻塞），调试用，正式项目少用
}
function myStopFunction()  // 函数声明（会提升 hoisting）
{
    clearTimeout(myVar);  // 取消 setTimeout 设定的定时器
}
