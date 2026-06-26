// ============================================================
// 【第 03 节 · JavaScript 用法】demo6：外部 JS 文件的内容（被 demo5.html 引入）
// ============================================================
//
// 【是什么】这是一个【纯 JS 文件】，会被 demo5.html 通过 <script src> 引入执行。
//          注意：纯 .js 文件里【不要】写 <script> 标签。
//
// 【后端类比】
//   - 就像一个被 import 的工具模块 / 公共函数库。
//   - 浏览器加载它时，会执行里面的【顶层语句】。
//   - 这里定义了一个函数 myFunction，但没有立即调用它——
//     它会被 HTML 里的 onclick 等事件【按需调用】。
//     （后端类比：相当于注册了一个 handler，等请求来才执行）
//
// 【说明】原教程中这个函数没有绑定到具体按钮，所以单独看不会触发。
//        要看到效果：把它引入一个带 onclick 按钮的 HTML（参考 demo3/demo4）。

// 定义一个函数（声明提升，加载时即注册到作用域）
function myFunction()
{
    // document.getElementById：按 id 查找 DOM 元素（id 相当于“主键”）
    // .innerHTML：设置该元素内部的内容
    document.getElementById("demo").innerHTML="我的第一个 JavaScript 函数";
}
