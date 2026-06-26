// ============================================================
// 【第 14 节 · JavaScript 字符串模板】demo6.js
// ============================================================
//
// 【知识点 / 后端类比】
//   反引号 ` + ${表达式} 实现插值，支持多行。
//   后端类比：≈ Python f-string / Java String.format / Go fmt.Sprintf，但更直观，无需 %s/%d 格式符。
//   ${} 里可放任意表达式(运算、函数调用)。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
const name = 'Runoob';  // const 声明（块作用域常量，≈ Java final，推荐）
const age = 30;  // const 声明（块作用域常量，≈ Java final，推荐）
const message = `My name is ${name} and I'm ${age} years old.`;  // const 声明（块作用域常量，≈ Java final，推荐）
