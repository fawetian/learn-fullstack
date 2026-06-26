// ============================================================
// 【第 20 节 · JavaScript while 循环】demo3.js
// ============================================================
//
// 【知识点 / 后端类比】
//   while(条件) 和 do-while，和后端一样。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
    cars=["BMW","Volvo","Saab","Ford"];
var i=0;  // var 声明（函数作用域、会提升，推荐改用 let/const）
for (;cars[i];)  // for 循环
{
document.write(cars[i] + "<br>");  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
    i++;
}
