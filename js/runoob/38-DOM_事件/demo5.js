// ============================================================
// 【第 38 节 · DOM 事件】demo5.js
// ============================================================
//
// 【知识点 / 后端类比】
//   addEventListener 注册事件监听(推荐，优于 onclick 属性)。事件流：捕获→目标→冒泡。
//   后端类比：addEventListener ≈ 订阅消息/注册多个监听器；事件冒泡≈事件向上传播。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//   【注意】本文件含 HTML 标签（如 <script>），实际应放进 .html 文件运行，此处 runoob 仅作代码结构演示。
//
<script>document.getElementById("myBtn").onclick=function(){displayDate()};  // 按 id 查找 DOM 元素（id≈主键），返回该节点
</script>
