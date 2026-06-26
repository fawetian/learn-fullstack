// ============================================================
// 【第 23 节 · JavaScript 表单验证】demo6.js
// ============================================================
//
// 【知识点 / 后端类比】
//   前端表单校验：提交前用 JS 检查输入是否合法。
//   后端类比：≈ 后端 DTO/参数校验(@Valid)，但前端校验是为【用户体验】，后端校验是【安全必需】，两者都要做。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
function validateEmail(email) {  // 函数声明（会提升 hoisting）
var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // var 声明（函数作用域、会提升，推荐改用 let/const）
return regex.test(email);  // 返回值给调用方（和后端 return 一致）
}

var email = "example@example.com";  // var 声明（函数作用域、会提升，推荐改用 let/const）
if (validateEmail(email)) {  // if 条件分支
console.log('Valid email address.');  // 输出到浏览器控制台（≈ 后端的 print/println）
} else {
console.log('Invalid email address.');  // 输出到浏览器控制台（≈ 后端的 print/println）
}
