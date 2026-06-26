// ============================================================
// 【第 58 节 · JavaScript 测试 jQuery】demo3.js
// ============================================================
//
// 【知识点 / 后端类比】
//   jQuery：$ 选择器 + 链式操作，曾最流行。$(fn)、$.get、$(selector).html()。
//   后端类比：$ ≈ 通用的“查找+操作”DSL，类似封装好的查询构造器。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
function myFunction()  // 函数声明（会提升 hoisting）
{
    $("#h01").html("Hello jQuery");  // jQuery 选择器/调用（$ 是 jQuery 的入口函数）
}
    $(document).ready(myFunction);  // jQuery 选择器/调用（$ 是 jQuery 的入口函数）
