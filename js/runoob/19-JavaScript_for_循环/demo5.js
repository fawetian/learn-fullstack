// ============================================================
// 【第 19 节 · JavaScript for 循环】demo5.js
// ============================================================
//
// 【知识点 / 后端类比】
//   for / for-in(遍历 key) / for-of(遍历值,ES6) / forEach。
//   后端类比(重点坑)：for-in 枚举【键名】，遍历数组会得到字符串索引“0”“1”，不推荐遍历数组！用 for-of 或 forEach。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
var i=2,len=cars.length;  // 长度（字符串/数组的【属性】，不带括号！Java 是方法 length()）
for (; i<len; i++)  // for 循环
{
document.write(cars[i] + "<br>");  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
}
