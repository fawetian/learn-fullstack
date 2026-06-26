// ============================================================
// 【第 45 节 · JavaScript Array】demo2.js
// ============================================================
//
// 【知识点 / 后端类比】
//   数组方法：push/pop/shift/unshift/splice/slice/sort/forEach/map/filter 等。
//   后端类比：≈ Java ArrayList / Go slice / Python list。注意 sort 默认按【字符串】排序(数字排序需传比较函数，坑！)。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
    Array.prototype.myUcase=function(){  // 构造函数的原型：在此定义的方法被所有实例共享（≈ 实例方法）
for (i=0;i<this.length;i++){  // 长度（字符串/数组的【属性】，不带括号！Java 是方法 length()）
    this[i]=this[i].toUpperCase();  // this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）
}
}
