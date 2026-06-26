// ============================================================
// 【第 65 节 · JavaScript 静态方法】demo1.js
// ============================================================
//
// 【知识点 / 后端类比】
//   ES6 class 的 static 方法，挂在【类本身】而非实例。
//   后端类比：≈ Java static 方法，用 ClassName.method() 调用，无需实例化。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
    class Runoob {
constructor(name) {
    this.name = name;  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
}
    static hello() {
return "Hello!!";  // 返回值给调用方（和后端 return 一致）
}
}
let noob = new Runoob("菜鸟教程");  // new 调用构造函数创建对象（≈ 后端的 new）

// 可以在类中调用 'hello()' 方法
document.getElementById("demo").innerHTML = Runoob.hello();  // 按 id 查找 DOM 元素（id≈主键），返回该节点

// 不能通过实例化后的对象调用静态方法
// document.getElementById("demo").innerHTML = noob.hello();
// 以上代码会报错
