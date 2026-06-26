// ============================================================
// 【第 18 节 · JavaScript switch】demo3.js
// ============================================================
//
// 【知识点 / 后端类比】
//   switch 匹配 case 执行，case 用 === 比较。break 防止 fall-through(穿透)。
//   后端对比：和 Java switch 一样需要 break；Go 的 switch 默认不穿透(相反的坑)。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
var d=new Date().getDay();  // 创建当前时间对象（≈ 后端的 new Date()）
switch (d)  // switch 分支
{
case 6:x="今天是星期六";
break;
case 0:x="今天是星期日";
break;
default:
    x="期待周末";
}
document.getElementById("demo").innerHTML=x;  // 按 id 查找 DOM 元素（id≈主键），返回该节点
