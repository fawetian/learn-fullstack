// ============================================================
// 【第 08 节 · JavaScript 数据类型】demo2.js
// ============================================================
//
// 【知识点 / 后端类比】
//   基本类型：string/number/boolean/null/undefined；引用类型：object/array/function。
//   后端类比(重点)：JS 是动态类型(运行时确定)，用 typeof 判断类型；不像 Java 编译期固定类型。
//   null vs undefined：null 是“空值(有意)”，undefined 是“未定义(默认)”。== 会认为它们相等，=== 不等。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
    typeof "John"                // 返回 string
    typeof 3.14                  // 返回 number
    typeof false                 // 返回 boolean
    typeof [1,2,3,4]             // 返回 object
    typeof {name:'John', age:34} // 返回 object
