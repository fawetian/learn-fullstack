// ============================================================
// 【第 40 节 · JavaScript 对象(高级)】demo14.js
// ============================================================
//
// 【知识点 / 后端类比】
//   对象属性特性(configurable/enumerable/writable)、遍历(for-in/Object.keys)、原型。
//   后端类比：理解对象的元信息，≈ 反射里读字段修饰符。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
var myFather=new person("John","Doe",50,"blue");  // new 调用构造函数创建对象（≈ 后端的 new）
var myMother=new person("Sally","Rally",48,"green");  // new 调用构造函数创建对象（≈ 后端的 new）
