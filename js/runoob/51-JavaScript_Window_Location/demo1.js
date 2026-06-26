// ============================================================
// 【第 51 节 · JavaScript Window Location】demo1.js
// ============================================================
//
// 【知识点 / 后端类比】
//   location 提供/控制当前 URL：href(完整地址)、pathname、reload()、assign() 跳转。
//   后端类比：≈ 后端做重定向，这里在浏览器端控制地址栏。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//   【注意】本文件含 HTML 标签（如 <script>），实际应放进 .html 文件运行，此处 runoob 仅作代码结构演示。
//
<script>
document.write(location.pathname);  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
</script>
