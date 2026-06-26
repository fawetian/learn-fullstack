// ============================================================
// 【第 19 节 · JavaScript for 循环】demo7.js
// ============================================================
//
// 【知识点 / 后端类比】
//   for / for-in(遍历 key) / for-of(遍历值,ES6) / forEach。
//   后端类比(重点坑)：for-in 枚举【键名】，遍历数组会得到字符串索引“0”“1”，不推荐遍历数组！用 for-of 或 forEach。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
var person={fname:"Bill",lname:"Gates",age:56};  // var 声明（函数作用域、会提升，推荐改用 let/const）

    for (x in person) // x 为属性名
{
    txt=txt + person[x];
}
