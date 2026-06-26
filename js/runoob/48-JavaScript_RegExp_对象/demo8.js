// ============================================================
// 【第 48 节 · JavaScript RegExp】demo8.js
// ============================================================
//
// 【知识点 / 后端类比】
//   正则：/pattern/flags 或 new RegExp。test/exec 方法。
//   后端类比：和后端正则(Python re、Java Pattern、Go regexp)语法通用。g 全局、i 忽略大小写。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
var patt1=new RegExp("e");  // new 调用构造函数创建对象（≈ 后端的 new）
document.write(patt1.test("The best things in life are free"));  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
