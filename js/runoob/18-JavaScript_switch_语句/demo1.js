// ============================================================
// 【第 18 节 · JavaScript switch】demo1.js
// ============================================================
//
// 【知识点 / 后端类比】
//   switch 匹配 case 执行，case 用 === 比较。break 防止 fall-through(穿透)。
//   后端对比：和 Java switch 一样需要 break；Go 的 switch 默认不穿透(相反的坑)。
//
//   【注意】本文件含教学伪代码/占位示意文字，非可直接运行程序。
//
switch(n)  // switch 分支
{
case 1:
    执行代码块 1
break;
case 2:
    执行代码块 2
break;
default:
    与 case 1 和 case 2 不同时执行的代码
}
