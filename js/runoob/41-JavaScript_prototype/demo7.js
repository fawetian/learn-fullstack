// ============================================================
// 【第 41 节 · JavaScript prototype】demo7.js
// ============================================================
//
// 【知识点 / 后端类比】
//   【原型链】是 JS 继承机制！每个对象有 __proto__ 指向其原型，沿链查找属性。
//   后端类比(重要差异)：与 Java 的类继承完全不同！JS 没有传统“类”，靠原型链实现继承/方法共享。
//   构造函数.prototype 上定义的方法，被所有实例共享(类似 Java 的实例方法)。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
function Person(name) {  // 函数声明（会提升 hoisting）
    this.name = name;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
}

    Person.prototype.sayHello = function() {  // 构造函数的原型：在此定义的方法被所有实例共享（≈ 实例方法）
console.log("Hello, my name is " + this.name);  // 输出到浏览器控制台（≈ 后端的 print/println）
};

let bob = new Person("Bob");  // new 调用构造函数创建对象（≈ 后端的 new）
    bob.sayHello(); // 输出: Hello, my name is Bob

// 修改原型
    Person.prototype.sayGoodbye = function() {  // 构造函数的原型：在此定义的方法被所有实例共享（≈ 实例方法）
console.log("Goodbye from " + this.name);  // 输出到浏览器控制台（≈ 后端的 print/println）
};

    bob.sayGoodbye(); // 输出: Goodbye from Bob
