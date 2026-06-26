// ============================================================
// 【第 50 节 · JavaScript Window Screen】demo2.js
// ============================================================
//
// 【知识点 / 后端类比】
//   screen 对象提供屏幕信息：width/height/availWidth 等。读取用户显示器尺寸。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//   【注意】本文件含 HTML 标签（如 <script>），实际应放进 .html 文件运行，此处 runoob 仅作代码结构演示。
//   【注意】本文件含教学伪代码/占位示意文字，非可直接运行程序。
//
<script>
document.write("可用高度: " + screen.availHeight);  // 直接写入文档流（已过时，页面加载后调用会覆盖整页）
</script>
