// ============================================================
// 【第 40 节 · JavaScript 对象(高级)】demo17.js
// ============================================================
//
// 【知识点 / 后端类比】
//   对象属性特性(configurable/enumerable/writable)、遍历(for-in/Object.keys)、原型。
//   后端类比：理解对象的元信息，≈ 反射里读字段修饰符。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
function person(firstname,lastname,age,eyecolor)  // 函数声明（会提升 hoisting）
{
    this.firstname=firstname;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
    this.lastname=lastname;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
    this.age=age;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
    this.eyecolor=eyecolor;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）

    this.changeName=changeName;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
function changeName(name)  // 函数声明（会提升 hoisting）
{
    this.lastname=name;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
}
}
