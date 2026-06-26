// ============================================================
// 【第 58 节 · JavaScript 测试 jQuery】demo2.js
// ============================================================
//
// 【知识点 / 后端类比】
//   jQuery：$ 选择器 + 链式操作，曾最流行。$(fn)、$.get、$(selector).html()。
//   后端类比：$ ≈ 通用的“查找+操作”DSL，类似封装好的查询构造器。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
function myFunction()  // 函数声明（会提升 hoisting）
{
var obj=document.getElementById("h01");  // 按 id 查找 DOM 元素（id≈主键），返回该节点
    obj.innerHTML="Hello jQuery";  // 设置元素内部 HTML 内容（会重新解析 HTML）
}
    onload=myFunction;  // 加载完成事件
