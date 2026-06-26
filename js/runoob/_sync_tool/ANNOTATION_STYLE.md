# 代码注释风格指南（后端程序员视角学 JS）

## 读者画像
读者是**后端程序员**（熟悉 Java/Go/Python 等），正在学 JS。注释要：
- 用后端熟悉的概念类比解释前端/JS 特性
- 讲清楚"是什么 + 为什么这么写 + 后端类比"
- 解释前端特有概念（DOM、事件、浏览器 API、闭包、原型链、异步等）
- 说明运行方式和注意点

## 注释结构（每个文件）

### .js 文件结构
```js
// ============================================================
// 【第 XX 节 · 节标题】demoN：本 demo 的主题（一句话）
// ============================================================
//
// 【是什么】这个 demo 演示的核心知识点。
//
// 【后端类比】用 Java/Go/Python/模板引擎等类比。例如：
//            - <script> ≈ PHP 的 <?php ?> / JSP 的 <% %>
//            - document ≈ 服务端的 ctx / app 全局上下文
//            - getElementById ≈ 按主键查记录
//            - onclick ≈ 给路由注册的回调
//            - function 提升 ≈ 编译期符号解析
//            - Promise ≈ Java CompletableFuture / Go channel 的回调版
//
// 【关键 API/概念】逐条解释涉及的 API（参数、返回值、副作用、坑）。
//
// 【运行方式】浏览器打开 / node 运行 / 需配合 HTML 等。
// 【注意】原教程里的特殊点（占位符、伪代码、不可直接运行的片段等）。

// 代码本体：保留原有逻辑，在关键行加行内注释
原始代码行;  // 行内注释：解释这行的作用
```

### .html 文件结构
- 文件头用 `<!-- ... -->` 注释块（同上内容）
- `<script>` 内的 JS 用 `//` 行内注释
- HTML 标签关键处用 `<!-- 注释 -->`

## 核心原则
1. **保留原始代码逻辑**：不改变代码行为，只加注释、美化缩进。
2. **后端类比要准确**：比如 JS 的 `var` 作用域 ≠ Java 的局部变量，要点出差异。
3. **解释"坑"**：JS 的隐式类型转换、变量提升、this 绑定、== vs === 等。
4. **务实**：注明哪些 API 已过时（如 document.write、alert），现代项目怎么做。
5. **简洁有力**：行内注释一行说清，不啰嗦；文件头讲透知识点。

## 参考成品（第 3 节，已精注）
见 `03-JavaScript_用法/` 下的 6 个文件，是标准范例。重点参考：
- `demo1.js`：纯 JS 片段的注释方式
- `demo3.html`：完整交互 HTML 的注释方式（DOM + 事件 + 函数）
- `demo4.html`：对比型 demo（讲清和上一个的区别 + 为什么）

## 章节知识点速查（注释要贴合每节主题）
- 02 简介：JS 能做什么、写入 HTML 的几种方式
- 04 输出：document.write / innerHTML / console.log / alert 的区别
- 05 语句：分号、语句执行顺序、代码块
- 06 注释：单行 // 多行 /**/ （后端都懂，简单点）
- 07 变量：var 声明、弱类型、命名规范（对比 Java 强类型）
- 08 数据类型：字符串/数字/布尔/数组/对象/null/undefined（重点：动态类型、typeof）
- 09 对象（基础）：对象字面量、属性访问（≈ Java POJO / Go struct / Python dict）
- 10 函数：声明、表达式、参数、return、arguments（对比 Java 方法）
- 11 作用域：全局/函数作用域（重点：var 没有块作用域，和 Java/Go 不同）
- 12 事件：onclick/onload 等（事件驱动，对比后端回调/钩子）
- 13 字符串：转义、属性 length、不可变性
- 14 字符串模板：反引号 ` ${}（对比 Java 的 String.format / Python f-string）
- 15 运算符：算术/赋值/字符串拼接（+ 号重载，坑）
- 17 条件语句：if/else if/else（和后端一样）
- 18 switch：和 Java switch 类似，强调 break/fall-through
- 19 for：for/for-in/for-of 区别（for-in 枚举 key，坑）
- 20 while：do-while
- 21 break/continue：和后端一样，label 用法
- 22 错误：try/catch/finally/throw（对比 Java 异常，JS 只有 Error 没有检查异常）
- 23 表单验证：前端校验（对比后端 DTO 校验）
- 24 验证 API：约束验证 API
- 26 this：JS 最难之一！四种绑定规则（默认/隐式/显式/new）
- 27 let/const：ES6 块作用域（对比 var 的坑，const 类似 Java final）
- 28 JSON：parse/stringify（后端最熟，对比 Jackson/gson）
- 29 void：void(0) 阻止默认行为
- 30 异步编程：回调、事件循环（对比后端线程模型）
- 32 async/await：≈ Java CompletableFuture 的同步写法
- 33 代码规范：命名、空格、语句
- 35-39 DOM：DOM 树、增删改查元素、样式、事件（重点：DOM = 浏览器的"对象树")
- 40 对象（高级）：属性特性、遍历、原型（≈ 类）
- 41 prototype：原型链（JS 继承机制，和 Java 类继承完全不同，重点讲！）
- 42-48 内置对象：Number/String/Date/Array/Boolean/Math/RegExp（≈ Java 包装类/工具类）
- 49-56 BOM：window/screen/location/history/navigator/弹窗/定时器/Cookie
- 57-59 库：jQuery/Prototype（历史了解）
- 65 静态方法：class 的 static（ES6 class，对比 Java static）
```
