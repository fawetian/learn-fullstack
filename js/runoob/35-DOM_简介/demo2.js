// ============================================================
// 【第 35 节 · DOM 简介】demo2.js
// ============================================================
//
// 【知识点 / 后端类比】
//   DOM=文档对象模型，把 HTML 解析成一棵【树】，JS 通过 DOM 操作页面。
//   后端类比：DOM 是浏览器给 JS 的【页面数据结构 API】，类似后端操作 XML/JSON 树。document 是树根。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
var x=document.getElementById("main");var y=x.getElementsByTagName("p");  // 按 id 查找 DOM 元素（id≈主键），返回该节点
