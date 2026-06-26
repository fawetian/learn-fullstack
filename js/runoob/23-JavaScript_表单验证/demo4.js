// ============================================================
// 【第 23 节 · JavaScript 表单验证】demo4.js
// ============================================================
//
// 【知识点 / 后端类比】
//   前端表单校验：提交前用 JS 检查输入是否合法。
//   后端类比：≈ 后端 DTO/参数校验(@Valid)，但前端校验是为【用户体验】，后端校验是【安全必需】，两者都要做。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function validateForm(){  // 函数声明（会提升 hoisting）
var x=document.forms["myForm"]["email"].value;  // var 声明（函数作用域、会提升，推荐改用 let/const）
var atpos=x.indexOf("@");  // 查找元素索引，找不到返回 -1
var dotpos=x.lastIndexOf(".");  // var 声明（函数作用域、会提升，推荐改用 let/const）
if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){  // 长度（字符串/数组的【属性】，不带括号！Java 是方法 length()）
alert("不是一个有效的 e-mail 地址");  // 浏览器弹窗（模态、阻塞），调试用，正式项目少用
return false;  // 返回值给调用方（和后端 return 一致）
}
}
