// ============================================================
// 【第 13 节 · JavaScript 字符串】demo3.js
// ============================================================
//
// 【知识点 / 后端类比】
//   字符串单/双引号等价，不可变，length 是【属性不是方法】。
//   后端对比(坑)：Java str.length() 带括号；JS str.length 不带！写成方法会报错。
//   原始字符串 vs new String 对象(不推荐用 new)，=== 比较类型不同返回 false。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
const name = "RUNOOB";  // const 声明（块作用域常量，≈ Java final，推荐）
let letter = name[2];  // let 声明（块作用域，推荐）

document.getElementById("demo").innerHTML = letter;  // 按 id 查找 DOM 元素（id≈主键），返回该节点
