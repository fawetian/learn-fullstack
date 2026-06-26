// ============================================================
// 【第 23 节 · JavaScript 表单验证】demo2.js
// ============================================================
//
// 【知识点 / 后端类比】
//   前端表单校验：提交前用 JS 检查输入是否合法。
//   后端类比：≈ 后端 DTO/参数校验(@Valid)，但前端校验是为【用户体验】，后端校验是【安全必需】，两者都要做。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function validateForm()  // 函数声明（会提升 hoisting）
{
var x=document.forms["myForm"]["fname"].value;  // var 声明（函数作用域、会提升，推荐改用 let/const）
if (x==null || x=="")  // if 条件分支
{
alert("姓必须填写");  // 浏览器弹窗（模态、阻塞），调试用，正式项目少用
return false;  // 返回值给调用方（和后端 return 一致）
}
}
