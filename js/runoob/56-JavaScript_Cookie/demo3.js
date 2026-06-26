// ============================================================
// 【第 56 节 · JavaScript Cookie】demo3.js
// ============================================================
//
// 【知识点 / 后端类比】
//   document.cookie 读写 cookie。Cookie 是存在浏览器的小段数据，每次请求自动带上。
//   后端类比：后端最熟！Cookie 用于会话/状态保持，后端 Set-Cookie 下发，浏览器存储并回传。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
function checkCookie()  // 函数声明（会提升 hoisting）
{
var username=getCookie("username");  // var 声明（函数作用域、会提升，推荐改用 let/const）
if (username!="")  // if 条件分支
{
alert("Welcome again " + username);  // 浏览器弹窗（模态、阻塞），调试用，正式项目少用
}
else
{
    username = prompt("Please enter your name:","");  // 输入弹窗，返回用户输入的字符串
if (username!="" && username!=null)  // if 条件分支
{
    setCookie("username",username,365);
}
}
}
