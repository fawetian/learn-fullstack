// ============================================================
// 【第 49 节 · JavaScript Window】demo3.js
// ============================================================
//
// 【知识点 / 后端类比】
//   window 是【浏览器全局对象】(BOM 核心)，也是全局作用域。alert/prompt/confirm/innerWidth 等。
//   后端类比：window ≈ 浏览器环境下的“全局运行时上下文/容器”，所有全局变量挂在它上面。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
var w=window.innerWidth  // window 是浏览器全局对象（BOM 核心）
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var h=window.innerHeight  // window 是浏览器全局对象（BOM 核心）
    || document.documentElement.clientHeight
    || document.body.clientHeight;
