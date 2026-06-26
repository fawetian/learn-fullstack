// ============================================================
// 【第 28 节 · JavaScript JSON】demo5.js
// ============================================================
//
// 【知识点 / 后端类比】
//   JSON 是数据交换格式，JSON.parse(字符串→对象)、JSON.stringify(对象→字符串)。
//   后端类比：后端最熟！≈ Java Jackson/gson 的 readValue/writeValue、Go encoding/json 的 Marshal/Unmarshal。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
var text = '{ "sites" : [' +  // var 声明（函数作用域、会提升，推荐改用 let/const）
    '{ "name":"Runoob" , "url":"www.runoob.com" },' +
    '{ "name":"Google" , "url":"www.google.com" },' +
    '{ "name":"Taobao" , "url":"www.taobao.com" } ]}';

    obj = JSON.parse(text);  // JSON 字符串 → JS 对象（≈ 后端反序列化 readValue/Unmarshal）
document.getElementById("demo").innerHTML = obj.sites[1].name + " " + obj.sites[1].url;  // 按 id 查找 DOM 元素（id≈主键），返回该节点
