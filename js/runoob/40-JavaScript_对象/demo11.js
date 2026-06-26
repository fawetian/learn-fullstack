// ============================================================
// 【第 40 节 · JavaScript 对象(高级)】demo11.js
// ============================================================
//
// 【知识点 / 后端类比】
//   对象属性特性(configurable/enumerable/writable)、遍历(for-in/Object.keys)、原型。
//   后端类比：理解对象的元信息，≈ 反射里读字段修饰符。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
var person = {  // var 声明（函数作用域、会提升，推荐改用 let/const）
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    isStudent: false,
    greet: function() {
console.log('Hello, I am ' + this.firstName + ' ' + this.lastName);  // 输出到浏览器控制台（≈ 后端的 print/println）
}
};

    console.log(person.firstName);  // 输出: John
    person.greet();  // 输出: Hello, I am John Doe
