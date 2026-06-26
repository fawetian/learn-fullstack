// ============================================================
// 【第 39 节 · DOM 元素】demo3.js
// ============================================================
//
// 【知识点 / 后端类比】
//   createElement/createTextNode/appendChild/removeChild 动态增删 DOM 节点。
//   后端类比：≈ 对数据结构树做增删改查(CRUD)，这里操作的是页面节点树。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
var node = document.createTextNode("这是一个新的段落。");  // 创建文本节点
