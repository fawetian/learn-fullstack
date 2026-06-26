// ============================================================
// 【第 56 节 · JavaScript Cookie】demo2.js
// ============================================================
//
// 【知识点 / 后端类比】
//   document.cookie 读写 cookie。Cookie 是存在浏览器的小段数据，每次请求自动带上。
//   后端类比：后端最熟！Cookie 用于会话/状态保持，后端 Set-Cookie 下发，浏览器存储并回传。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function getCookie(cname)  // 函数声明（会提升 hoisting）
{
var name = cname + "=";  // var 声明（函数作用域、会提升，推荐改用 let/const）
var ca = document.cookie.split(';');  // 按分隔符拆成数组（≈ 后端 string.split）
for(var i=0; i<ca.length; i++)  // 长度（字符串/数组的【属性】，不带括号！Java 是方法 length()）
{
var c = ca[i].trim();  // var 声明（函数作用域、会提升，推荐改用 let/const）
if (c.indexOf(name)==0) return c.substring(name.length,c.length);  // 返回值给调用方（和后端 return 一致）
}
return "";  // 返回值给调用方（和后端 return 一致）
}
