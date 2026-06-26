// ============================================================
// 【第 21 节 · JavaScript break 和 continue】demo7.js
// ============================================================
//
// 【知识点 / 后端类比】
//   break 跳出循环，continue 跳过本次，和后端一样。支持 label 标签跳出嵌套循环。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
    cars=["BMW","Volvo","Saab","Ford"];
    list:
{
document.write(cars[0] + "<br>");  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
document.write(cars[1] + "<br>");  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
document.write(cars[2] + "<br>");  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
break list;
document.write(cars[3] + "<br>");  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
document.write(cars[4] + "<br>");  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
document.write(cars[5] + "<br>");  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
}
