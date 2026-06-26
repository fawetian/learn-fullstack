// ============================================================
// 【第 54 节 · JavaScript 弹窗】demo3.js
// ============================================================
//
// 【知识点 / 后端类比】
//   三种弹窗：alert(提示)、confirm(确认返回布尔)、prompt(输入返回字符串)。都阻塞。
//   后端类比：浏览器原生的“模态对话框”，正式项目多用自定义 UI 替代。
//
//   【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。
//
var person=prompt("请输入你的名字","Harry Potter");  // 输入弹窗，返回用户输入的字符串
if (person!=null && person!="")  // if 条件分支
{
    x="你好 " + person + "! 今天感觉如何?";
document.getElementById("demo").innerHTML=x;  // 按 id 查找 DOM 元素（id≈主键），返回该节点
}
