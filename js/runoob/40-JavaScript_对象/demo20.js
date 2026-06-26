// ============================================================
// 【第 40 节 · JavaScript 对象(高级)】demo20.js
// ============================================================
//
// 【知识点 / 后端类比】
//   对象属性特性(configurable/enumerable/writable)、遍历(for-in/Object.keys)、原型。
//   后端类比：理解对象的元信息，≈ 反射里读字段修饰符。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
var person={fname:"John",lname:"Doe",age:25};  // var 声明（函数作用域、会提升，推荐改用 let/const）

for (x in person)  // for 循环
{
    txt=txt + person[x];
}
