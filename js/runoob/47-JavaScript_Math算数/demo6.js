// ============================================================
// 【第 47 节 · JavaScript Math】demo6.js
// ============================================================
//
// 【知识点 / 后端类比】
//   Math 数学工具(静态)：random/round/floor/ceil/max/min/PI 等。
//   后端类比：≈ Java Math 类，全是静态方法，无需 new。random() 返回 [0,1) 浮点。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
document.write(Math.floor(Math.random()*11));  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
