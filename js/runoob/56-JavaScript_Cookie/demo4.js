// ============================================================
// 【第 56 节 · JavaScript Cookie】demo4.js
// ============================================================
//
// 【知识点 / 后端类比】
//   document.cookie 读写 cookie。Cookie 是存在浏览器的小段数据，每次请求自动带上。
//   后端类比：后端最熟！Cookie 用于会话/状态保持，后端 Set-Cookie 下发，浏览器存储并回传。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function setCookie(cname,cvalue,exdays){  // 函数声明（会提升 hoisting）
var d = new Date();  // 创建当前时间对象（≈ 后端的 new Date()）
    d.setTime(d.getTime()+(exdays*24*60*60*1000));  // 获取毫秒时间戳（≈ 后端 epoch millis）
var expires = "expires="+d.toGMTString();  // var 声明（函数作用域、会提升，推荐改用 let/const）
document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){  // 函数声明（会提升 hoisting）
var name = cname + "=";  // var 声明（函数作用域、会提升，推荐改用 let/const）
var ca = document.cookie.split(';');  // 按分隔符拆成数组（≈ 后端 string.split）
for(var i=0; i<ca.length; i++) {  // 长度（字符串/数组的【属性】，不带括号！Java 是方法 length()）
var c = ca[i].trim();  // var 声明（函数作用域、会提升，推荐改用 let/const）
if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }  // 返回值给调用方（和后端 return 一致）
}
return "";  // 返回值给调用方（和后端 return 一致）
}
function checkCookie(){  // 函数声明（会提升 hoisting）
var user=getCookie("username");  // var 声明（函数作用域、会提升，推荐改用 let/const）
if (user!=""){  // if 条件分支
alert("欢迎 " + user + " 再次访问");  // 浏览器弹窗（模态、阻塞），调试用，正式项目少用
}
else {
    user = prompt("请输入你的名字:","");  // 输入弹窗，返回用户输入的字符串
if (user!="" && user!=null){  // if 条件分支
    setCookie("username",user,30);
}
}
}
