// ============================================================
// 【第 55 节 · JavaScript 计时事件】demo2.js
// ============================================================
//
// 【知识点 / 后端类比】
//   setTimeout(延迟执行一次)、setInterval(重复执行)、clearTimeout/clearInterval 清除。
//   后端类比：≈ 定时任务/定时器(cron、Java Timer)，但这里返回 id 用于取消。注意 this 在回调里常丢失。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
var myVar=setInterval(function(){myTimer()},1000);  // 每隔指定毫秒【重复执行】回调

function myTimer()  // 函数声明（会提升 hoisting）
{
var d=new Date();  // 创建当前时间对象（≈ 后端的 new Date()）
var t=d.toLocaleTimeString();  // var 声明（函数作用域、会提升，推荐改用 let/const）
document.getElementById("demo").innerHTML=t;  // 按 id 查找 DOM 元素（id≈主键），返回该节点
}
