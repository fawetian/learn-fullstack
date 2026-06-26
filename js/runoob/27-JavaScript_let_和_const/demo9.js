// ============================================================
// 【第 27 节 · JavaScript let 和 const】demo9.js
// ============================================================
//
// 【知识点 / 后端类比】
//   let/const(ES6) 引入【块级作用域】，修复 var 的坑。const ≈ Java final。
//   对比：var 变量提升、可重复声明、无块作用域；let 有块作用域、不可重复声明；const 必须初始化且不可重新赋值(但对象内部可改)。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
// 使用 var
function myFunction() {  // 函数声明（会提升 hoisting）
    var carName = "Volvo";   // 局部作用域
}

// 使用 let
function myFunction() {  // 函数声明（会提升 hoisting）
    let carName = "Volvo";   //  局部作用域
}
