// ============================================================
// 【第 08 节 · JavaScript 数据类型】demo1.js
// ============================================================
//
// 【知识点 / 后端类比】
//   基本类型：string/number/boolean/null/undefined；引用类型：object/array/function。
//   后端类比(重点)：JS 是动态类型(运行时确定)，用 typeof 判断类型；不像 Java 编译期固定类型。
//   null vs undefined：null 是“空值(有意)”，undefined 是“未定义(默认)”。== 会认为它们相等，=== 不等。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
var x;  // var 声明（函数作用域、会提升，推荐改用 let/const）
// x 为 undefinedvar x = 5;
// 现在 x 为数字
    var x = "John";      // 现在 x 为字符串
