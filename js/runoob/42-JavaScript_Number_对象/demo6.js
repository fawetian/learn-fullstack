// ============================================================
// 【第 42 节 · JavaScript Number 对象】demo6.js
// ============================================================
//
// 【知识点 / 后端类比】
//   Number 是数字包装对象。toFixed(n) 保留小数、toString(进制) 转换、MAX_VALUE 等常量。
//   后端类比：≈ Java 的 Double/Integer 包装类。注意 JS 数字统一是 number(不区分整/浮点)。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
    var myNumber=128;myNumber.toString(16);   // 返回 80
    myNumber.toString(8);    // 返回 200
    myNumber.toString(2);    // 返回 10000000
