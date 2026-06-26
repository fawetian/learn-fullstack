// ============================================================
// 【第 29 节 · JavaScript void】demo5.js
// ============================================================
//
// 【知识点 / 后端类比】
//   void 是运算符，void(0) 返回 undefined。常用于 <a href="javascript:void(0)"> 阻止链接默认跳转。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function getValue(){  // 函数声明（会提升 hoisting）
var a,b,c;  // var 声明（函数作用域、会提升，推荐改用 let/const）
    a = void ( b = 5, c = 7 );
document.write('a = ' + a + ' b = ' + b +' c = ' + c );  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
}
