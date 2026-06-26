// ============================================================
// 【第 10 节 · JavaScript 函数】demo4.js
// ============================================================
//
// 【知识点 / 后端类比】
//   function 声明函数；函数是【一等公民】(可赋值/传参/返回)。
//   后端类比(重点)：比 Java8 之前的“方法只能挂类上”灵活；≈ Java8 Lambda / Go func 当值用。
//   JS 【没有函数重载】(同名后定义覆盖前定义)，靠 arguments 数量分支。
//   函数声明会【提升 hoisting】。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function myFunction(a,b)  // 函数声明（会提升 hoisting）
{
return a*b;  // 返回值给调用方（和后端 return 一致）
}
document.getElementById("demo").innerHTML=myFunction(4,3);  // 按 id 查找 DOM 元素（id≈主键），返回该节点
