// ============================================================
// 【第 18 节 · JavaScript switch】demo2.js
// ============================================================
//
// 【知识点 / 后端类比】
//   switch 匹配 case 执行，case 用 === 比较。break 防止 fall-through(穿透)。
//   后端对比：和 Java switch 一样需要 break；Go 的 switch 默认不穿透(相反的坑)。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
var d=new Date().getDay();  // 创建当前时间对象（≈ 后端的 new Date()）
switch (d)  // switch 分支
{
case 0:x="今天是星期日";
break;
case 1:x="今天是星期一";
break;
case 2:x="今天是星期二";
break;
case 3:x="今天是星期三";
break;
case 4:x="今天是星期四";
break;
case 5:x="今天是星期五";
break;
case 6:x="今天是星期六";
break;
}
