// ============================================================
// 【第 14 节 · JavaScript 字符串模板】demo1.js
// ============================================================
//
// 【知识点 / 后端类比】
//   反引号 ` + ${表达式} 实现插值，支持多行。
//   后端类比：≈ Python f-string / Java String.format / Go fmt.Sprintf，但更直观，无需 %s/%d 格式符。
//   ${} 里可放任意表达式(运算、函数调用)。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
    `string text`

    `string text line 1
    string text line 2`

    `string text ${expression} string text`

    tagFunction`string text ${expression} string text`
