// ============================================================
// 【第 44 节 · JavaScript Date】demo1.js
// ============================================================
//
// 【知识点 / 后端类比】
//   Date 处理日期时间：new Date()、getHours()、getTime()(时间戳)等。
//   后端类比：≈ Java Date/LocalDateTime、Go time.Time。月份从 0 开始(坑！)、getDay() 0=周日。
//
//   【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。
//
new Date();  // 创建当前时间对象（≈ 后端的 new Date()）
new Date(value);  // 创建当前时间对象（≈ 后端的 new Date()）
new Date(dateString);  // 创建当前时间对象（≈ 后端的 new Date()）
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);  // 创建当前时间对象（≈ 后端的 new Date()）
