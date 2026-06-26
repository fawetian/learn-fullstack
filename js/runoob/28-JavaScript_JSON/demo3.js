// ============================================================
// 【第 28 节 · JavaScript JSON】demo3.js
// ============================================================
//
// 【知识点 / 后端类比】
//   JSON 是数据交换格式，JSON.parse(字符串→对象)、JSON.stringify(对象→字符串)。
//   后端类比：后端最熟！≈ Java Jackson/gson 的 readValue/writeValue、Go encoding/json 的 Marshal/Unmarshal。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
var text = '{ "sites" : [' +  // var 声明（函数作用域、会提升，推荐改用 let/const）
    '{ "name":"Runoob" , "url":"www.runoob.com" },' +
    '{ "name":"Google" , "url":"www.google.com" },' +
    '{ "name":"Taobao" , "url":"www.taobao.com" } ]}';
