// ============================================================
// 【第 43 节 · JavaScript String】demo7.js
// ============================================================
//
// 【知识点 / 后端类比】
//   String 对象方法：charAt/indexOf/replace/split/slice/substring 等。
//   后端类比：≈ Java String 方法名几乎一样(charAt/replace/split)，后端转过来很亲切。字符串不可变。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
var str="Hello world!";document.write(str.match("world") + "<br>");  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
document.write(str.match("World") + "<br>");document.write(str.match("world!"));  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
