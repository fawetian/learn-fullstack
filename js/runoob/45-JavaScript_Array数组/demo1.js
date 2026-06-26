// ============================================================
// 【第 45 节 · JavaScript Array】demo1.js
// ============================================================
//
// 【知识点 / 后端类比】
//   数组方法：push/pop/shift/unshift/splice/slice/sort/forEach/map/filter 等。
//   后端类比：≈ Java ArrayList / Go slice / Python list。注意 sort 默认按【字符串】排序(数字排序需传比较函数，坑！)。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
var mycars = new Array();  // new 调用构造函数创建对象（≈ 后端的 new）
    mycars[0] = "Saab";
    mycars[1] = "Volvo";
    mycars[2] = "BMW";
