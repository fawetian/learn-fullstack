// ============================================================
// 【第 10 节 · JavaScript 函数】demo7.js
// ============================================================
//
// 【知识点 / 后端类比】
//   function 声明函数；函数是【一等公民】(可赋值/传参/返回)。
//   后端类比(重点)：比 Java8 之前的“方法只能挂类上”灵活；≈ Java8 Lambda / Go func 当值用。
//   JS 【没有函数重载】(同名后定义覆盖前定义)，靠 arguments 数量分支。
//   函数声明会【提升 hoisting】。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
    var var1 = 1; // 不可配置全局属性
    var2 = 2; // 没有使用 var 声明，可配置全局属性

    console.log(this.var1); // 1
    console.log(window.var1); // 1
    console.log(window.var2); // 2

    delete var1; // false 无法删除
    console.log(var1); //1

    delete var2;
    console.log(delete var2); // true
    console.log(var2); // 已经删除 报错变量未定义
