// ============================================================
// 【第 41 节 · JavaScript prototype】demo10.js
// ============================================================
//
// 【知识点 / 后端类比】
//   【原型链】是 JS 继承机制！每个对象有 __proto__ 指向其原型，沿链查找属性。
//   后端类比(重要差异)：与 Java 的类继承完全不同！JS 没有传统“类”，靠原型链实现继承/方法共享。
//   构造函数.prototype 上定义的方法，被所有实例共享(类似 Java 的实例方法)。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
function Person(first, last, age, eyecolor) {  // 函数声明（会提升 hoisting）
    this.firstName = first;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
    this.lastName = last;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
    this.age = age;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
    this.eyeColor = eyecolor;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
}
    Person.prototype.name = function() {  // 构造函数的原型：在此定义的方法被所有实例共享（≈ 实例方法）
return this.firstName + " " + this.lastName;  // 返回值给调用方（和后端 return 一致）
};
