// ============================================================
// 【第 56 节 · JavaScript Cookie】demo1.js
// ============================================================
//
// 【知识点 / 后端类比】
//   document.cookie 读写 cookie。Cookie 是存在浏览器的小段数据，每次请求自动带上。
//   后端类比：后端最熟！Cookie 用于会话/状态保持，后端 Set-Cookie 下发，浏览器存储并回传。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function setCookie(cname,cvalue,exdays)  // 函数声明（会提升 hoisting）
{
var d = new Date();  // 创建当前时间对象（≈ 后端的 new Date()）
    d.setTime(d.getTime()+(exdays*24*60*60*1000));  // 获取毫秒时间戳（≈ 后端 epoch millis）
var expires = "expires="+d.toGMTString();  // var 声明（函数作用域、会提升，推荐改用 let/const）
document.cookie = cname + "=" + cvalue + "; " + expires;
}
