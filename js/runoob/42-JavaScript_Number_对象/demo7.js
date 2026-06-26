// ============================================================
// 【第 42 节 · JavaScript Number 对象】demo7.js
// ============================================================
//
// 【知识点 / 后端类比】
//   Number 是数字包装对象。toFixed(n) 保留小数、toString(进制) 转换、MAX_VALUE 等常量。
//   后端类比：≈ Java 的 Double/Integer 包装类。注意 JS 数字统一是 number(不区分整/浮点)。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
    myNumber=2;while (myNumber!=Infinity){
    myNumber=myNumber*myNumber; // 重复计算直到 myNumber 等于 Infinity}
