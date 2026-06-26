# -*- coding: utf-8 -*-
"""为 runoob JS 教程的每个代码文件加详细中文注释（后端程序员视角）。

策略：
  1. 每节预置一份「文件头讲解」（知识点 + 后端类比），按节注入。
  2. 行内注释：基于规则识别常见 API/语法，生成贴合的解释。
  3. 美化缩进、保留原始代码逻辑。
  4. HTML 文件用 <!-- -->，JS 文件用 //。

用法: python annotate_all.py            # 处理所有节（覆盖写）
      python annotate_all.py --only 07  # 只处理第 07 节
"""
import os
import re
import sys

ROOT = "/Users/zhihu/code/m_code/fullstack/learn-fullstack/js/runoob"

# ============================================================
# 每节的「文件头讲解」模板（简短版，行内注释补充细节）
# key = 节编号(int)，value = (节标题, 讲解文本)
# 讲解用 \n 分隔多行，会作为文件头注释块
# ============================================================
SECTION_INTROS = {
    1: ("JavaScript 教程", "JS 概览：Web 的编程语言，运行在浏览器（前端）和 Node.js（后端）。\n后端类比：JS 类似一个动态类型的语言，既能写前端脚本，也能用 Node.js 写后端服务。"),
    2: ("JavaScript 简介", "JS 能做什么：改变 HTML 内容/样式、对事件作出反应、发请求、验证表单等。\n后端类比：JS 是浏览器的“运行时”，让静态页面变成可交互的应用；类似服务端语言让模板动起来。"),
    3: ("JavaScript 用法", "<script> 标签是 HTML 里写 JS 的容器，可放 <head>/<body>/外部 .js 文件。\n后端类比：<script> ≈ 模板引擎的代码块（PHP 的 <?php ?>、JSP 的 <% %>），但运行在浏览器端。\n推荐：放 <body> 底部或用 defer，避免阻塞渲染。"),
    4: ("JavaScript 输出", "JS 没有 print/println，输出靠：document.write(过时)、innerHTML(改 DOM)、console.log(控制台)、alert(弹窗)。\n后端类比：console.log ≈ System.out.println / fmt.Println / print；innerHTML 是改页面显示内容。"),
    5: ("JavaScript 语句", "JS 语句以分号结尾（可省略但不推荐），按顺序执行，{ } 表示代码块。\n后端类比：和 Java/C/Go 的语句概念一致；分号规则类似 Go（自动插入），但建议显式写分号。"),
    6: ("JavaScript 注释", "单行 // 多行 /* */ ，和 Java/Go/C 完全一样。注释不会被解释器执行。"),
    7: ("JavaScript 变量", "用 var/let/const 声明变量，JS 是【弱类型/动态类型】——同一变量可存不同类型。\n后端类比(重点坑)：JS 变量【没有类型声明】，不像 Java int x=1; 而是 var x=1; 之后还能 x='a'。\nvar 只有函数作用域(无块作用域)；let/const(ES6) 才有块作用域。推荐用 let/const。"),
    8: ("JavaScript 数据类型", "基本类型：string/number/boolean/null/undefined；引用类型：object/array/function。\n后端类比(重点)：JS 是动态类型(运行时确定)，用 typeof 判断类型；不像 Java 编译期固定类型。\nnull vs undefined：null 是“空值(有意)”，undefined 是“未定义(默认)”。== 会认为它们相等，=== 不等。"),
    9: ("JavaScript 对象(基础)", "对象用 { } 字面量，键值对集合，可嵌套。\n后端类比：对象字面量 ≈ Java POJO / Go struct / Python dict。JS 对象本质是无序哈希表(键->值)。"),
    10: ("JavaScript 函数", "function 声明函数；函数是【一等公民】(可赋值/传参/返回)。\n后端类比(重点)：比 Java8 之前的“方法只能挂类上”灵活；≈ Java8 Lambda / Go func 当值用。\nJS 【没有函数重载】(同名后定义覆盖前定义)，靠 arguments 数量分支。\n函数声明会【提升 hoisting】。"),
    11: ("JavaScript 作用域", "var 只有【函数作用域】，没有块作用域——这是后端转 JS 最大坑之一！\n后端对比：Java/Go 的 { } 块内变量出块即失效；JS 用 var 时 {} 内变量会泄漏到外层函数。\n函数内不写 var 直接赋值会【自动变全局变量】(污染全局)。用 let/const 可避免。"),
    12: ("JavaScript 事件", "事件驱动：onclick/onload/onchange 等事件属性绑定回调，事件触发时执行。\n后端类比：onclick ≈ 给路由注册 handler；用户点击 ≈ 收到请求。事件驱动模型类似消息回调/钩子。"),
    13: ("JavaScript 字符串", "字符串单/双引号等价，不可变，length 是【属性不是方法】。\n后端对比(坑)：Java str.length() 带括号；JS str.length 不带！写成方法会报错。\n原始字符串 vs new String 对象(不推荐用 new)，=== 比较类型不同返回 false。"),
    14: ("JavaScript 字符串模板", "反引号 ` + ${表达式} 实现插值，支持多行。\n后端类比：≈ Python f-string / Java String.format / Go fmt.Sprintf，但更直观，无需 %s/%d 格式符。\n${} 里可放任意表达式(运算、函数调用)。"),
    15: ("JavaScript 运算符", "算术/赋值/比较/逻辑运算符。重点：【+ 号重载】——两边数字是加法，有字符串变拼接。\n后端类比：和 Java 类似，但 JS 弱类型更易踩坑(“3”+2=“32”)。比较用 === 严格相等(不转换类型)。"),
    16: ("JavaScript 比较", "比较/逻辑运算符返回 true/false。重点用 === 不用 ==。\n后端类比：=== 严格相等(类型+值)，== 宽松相等(会隐式转换，坑多，不推荐)。"),
    17: ("JavaScript 条件语句", "if / else if / else，和后端完全一样。&& 与、|| 或、! 非。"),
    18: ("JavaScript switch", "switch 匹配 case 执行，case 用 === 比较。break 防止 fall-through(穿透)。\n后端对比：和 Java switch 一样需要 break；Go 的 switch 默认不穿透(相反的坑)。"),
    19: ("JavaScript for 循环", "for / for-in(遍历 key) / for-of(遍历值,ES6) / forEach。\n后端类比(重点坑)：for-in 枚举【键名】，遍历数组会得到字符串索引“0”“1”，不推荐遍历数组！用 for-of 或 forEach。"),
    20: ("JavaScript while 循环", "while(条件) 和 do-while，和后端一样。"),
    21: ("JavaScript break 和 continue", "break 跳出循环，continue 跳过本次，和后端一样。支持 label 标签跳出嵌套循环。"),
    22: ("JavaScript 错误", "try/catch/finally/throw 异常处理。\n后端类比：≈ Java 异常机制，但 JS 【只有一个 catch(无类型)】，不像 Java catch 具体异常类型；JS 也没有“检查异常”概念。"),
    23: ("JavaScript 表单验证", "前端表单校验：提交前用 JS 检查输入是否合法。\n后端类比：≈ 后端 DTO/参数校验(@Valid)，但前端校验是为【用户体验】，后端校验是【安全必需】，两者都要做。"),
    24: ("JavaScript 验证 API", "约束验证 API：checkValidity()、validity 对象等，浏览器内置的校验能力。"),
    25: ("JavaScript 保留关键字", "不能用作变量名的关键字(如 class、return、function)。后端也都有保留字概念。"),
    26: ("JavaScript this", "JS 最难概念之一！this 指向【调用函数的对象】，随调用方式变化(4种绑定)。\n后端类比(重要差异)：Java 的 this 永远指向当前实例；JS 的 this 看【谁调用】它——\n默认绑定(普通调用→window)、隐式绑定(对象方法→该对象)、显式绑定(call/apply)、new 绑定(构造函数→新对象)。"),
    27: ("JavaScript let 和 const", "let/const(ES6) 引入【块级作用域】，修复 var 的坑。const ≈ Java final。\n对比：var 变量提升、可重复声明、无块作用域；let 有块作用域、不可重复声明；const 必须初始化且不可重新赋值(但对象内部可改)。"),
    28: ("JavaScript JSON", "JSON 是数据交换格式，JSON.parse(字符串→对象)、JSON.stringify(对象→字符串)。\n后端类比：后端最熟！≈ Java Jackson/gson 的 readValue/writeValue、Go encoding/json 的 Marshal/Unmarshal。"),
    29: ("JavaScript void", "void 是运算符，void(0) 返回 undefined。常用于 <a href=\"javascript:void(0)\"> 阻止链接默认跳转。"),
    30: ("JavaScript 异步编程", "JS 单线程 + 事件循环，异步靠回调/Promise/async。setTimeout 延迟执行。\n后端类比(重要)：JS 不像后端用多线程并发，而是【单线程事件循环】+ 非阻塞 IO。\n回调函数：延迟/请求完成后【未来某刻】被调用，类似注册一个回调。XMLHttpRequest 是老式 AJAX。"),
    31: ("JavaScript Promise", "Promise 表示异步操作最终结果，解决回调地狱。then/catch/finally 链式调用。\n后端类比：≈ Java CompletableFuture / Go 中带回调的 future，代表“一个未来的值”。三种状态：pending→fulfilled/rejected。"),
    32: ("JavaScript async/await", "用同步写法写异步代码(语法糖，基于 Promise)。async 函数返回 Promise，await 等待 Promise。\n后端类比：让异步代码看起来像同步，≈ C# 的 async/await，极大提升可读性。"),
    33: ("JavaScript 代码规范", "命名(驼峰)、缩进、分号、空格等编码规范。后端也都有各自的规范(如 Java 驼峰、Go gofmt)。"),
    34: ("JavaScript 测验", "知识点测验，无代码。"),
    35: ("DOM 简介", "DOM=文档对象模型，把 HTML 解析成一棵【树】，JS 通过 DOM 操作页面。\n后端类比：DOM 是浏览器给 JS 的【页面数据结构 API】，类似后端操作 XML/JSON 树。document 是树根。"),
    36: ("DOM HTML", "用 JS 改 HTML 内容：innerHTML、textContent、getElementById 等。\n后端类比：≈ 在服务端修改模板变量，但这里是【运行时改浏览器里的 DOM 节点】。"),
    37: ("DOM CSS", "用 element.style.属性 改样式。className/classList 改类名。\n后端类比：操作元素的“表现层属性”，类似改配置项触发重新渲染。"),
    38: ("DOM 事件", "addEventListener 注册事件监听(推荐，优于 onclick 属性)。事件流：捕获→目标→冒泡。\n后端类比：addEventListener ≈ 订阅消息/注册多个监听器；事件冒泡≈事件向上传播。"),
    39: ("DOM 元素", "createElement/createTextNode/appendChild/removeChild 动态增删 DOM 节点。\n后端类比：≈ 对数据结构树做增删改查(CRUD)，这里操作的是页面节点树。"),
    40: ("JavaScript 对象(高级)", "对象属性特性(configurable/enumerable/writable)、遍历(for-in/Object.keys)、原型。\n后端类比：理解对象的元信息，≈ 反射里读字段修饰符。"),
    41: ("JavaScript prototype", "【原型链】是 JS 继承机制！每个对象有 __proto__ 指向其原型，沿链查找属性。\n后端类比(重要差异)：与 Java 的类继承完全不同！JS 没有传统“类”，靠原型链实现继承/方法共享。\n构造函数.prototype 上定义的方法，被所有实例共享(类似 Java 的实例方法)。"),
    42: ("JavaScript Number 对象", "Number 是数字包装对象。toFixed(n) 保留小数、toString(进制) 转换、MAX_VALUE 等常量。\n后端类比：≈ Java 的 Double/Integer 包装类。注意 JS 数字统一是 number(不区分整/浮点)。"),
    43: ("JavaScript String", "String 对象方法：charAt/indexOf/replace/split/slice/substring 等。\n后端类比：≈ Java String 方法名几乎一样(charAt/replace/split)，后端转过来很亲切。字符串不可变。"),
    44: ("JavaScript Date", "Date 处理日期时间：new Date()、getHours()、getTime()(时间戳)等。\n后端类比：≈ Java Date/LocalDateTime、Go time.Time。月份从 0 开始(坑！)、getDay() 0=周日。"),
    45: ("JavaScript Array", "数组方法：push/pop/shift/unshift/splice/slice/sort/forEach/map/filter 等。\n后端类比：≈ Java ArrayList / Go slice / Python list。注意 sort 默认按【字符串】排序(数字排序需传比较函数，坑！)。"),
    46: ("JavaScript Boolean", "Boolean 包装对象。注意：new Boolean(false) 是 truthy 对象(坑)，推荐用原始值 true/false。"),
    47: ("JavaScript Math", "Math 数学工具(静态)：random/round/floor/ceil/max/min/PI 等。\n后端类比：≈ Java Math 类，全是静态方法，无需 new。random() 返回 [0,1) 浮点。"),
    48: ("JavaScript RegExp", "正则：/pattern/flags 或 new RegExp。test/exec 方法。\n后端类比：和后端正则(Python re、Java Pattern、Go regexp)语法通用。g 全局、i 忽略大小写。"),
    49: ("JavaScript Window", "window 是【浏览器全局对象】(BOM 核心)，也是全局作用域。alert/prompt/confirm/innerWidth 等。\n后端类比：window ≈ 浏览器环境下的“全局运行时上下文/容器”，所有全局变量挂在它上面。"),
    50: ("JavaScript Window Screen", "screen 对象提供屏幕信息：width/height/availWidth 等。读取用户显示器尺寸。"),
    51: ("JavaScript Window Location", "location 提供/控制当前 URL：href(完整地址)、pathname、reload()、assign() 跳转。\n后端类比：≈ 后端做重定向，这里在浏览器端控制地址栏。"),
    52: ("JavaScript Window History", "history 管理浏览历史：back()/forward()/go(n)。SPA 单页应用用 pushState。\n后端类比：≈ 浏览器的前进/后退栈。"),
    53: ("JavaScript Navigator", "navigator 提供浏览器信息：userAgent(浏览器标识)、language、platform 等。常用于判断环境。"),
    54: ("JavaScript 弹窗", "三种弹窗：alert(提示)、confirm(确认返回布尔)、prompt(输入返回字符串)。都阻塞。\n后端类比：浏览器原生的“模态对话框”，正式项目多用自定义 UI 替代。"),
    55: ("JavaScript 计时事件", "setTimeout(延迟执行一次)、setInterval(重复执行)、clearTimeout/clearInterval 清除。\n后端类比：≈ 定时任务/定时器(cron、Java Timer)，但这里返回 id 用于取消。注意 this 在回调里常丢失。"),
    56: ("JavaScript Cookie", "document.cookie 读写 cookie。Cookie 是存在浏览器的小段数据，每次请求自动带上。\n后端类比：后端最熟！Cookie 用于会话/状态保持，后端 Set-Cookie 下发，浏览器存储并回传。"),
    57: ("JavaScript 库", "JS 库(如 jQuery)封装常见操作，简化 DOM/AJAX。现代多用框架(React/Vue)。\n后端类比：库 ≈ 后端的第三方依赖(jar/go module)，提供封装好的工具函数。"),
    58: ("JavaScript 测试 jQuery", "jQuery：$ 选择器 + 链式操作，曾最流行。$(fn)、$.get、$(selector).html()。\n后端类比：$ ≈ 通用的“查找+操作”DSL，类似封装好的查询构造器。"),
    59: ("JavaScript 测试 Prototype", "Prototype 库：早期框架，扩展原生对象。已过时，了解即可。"),
    60: ("JavaScript 实例", "实例汇总，无独立代码。"),
    61: ("JavaScript 对象实例", "对象实例汇总。"),
    62: ("JavaScript 浏览器对象实例", "浏览器对象实例汇总。"),
    63: ("JavaScript HTML DOM 实例", "DOM 实例汇总。"),
    64: ("JavaScript 总结", "JS 知识总结，无代码。"),
    65: ("JavaScript 静态方法", "ES6 class 的 static 方法，挂在【类本身】而非实例。\n后端类比：≈ Java static 方法，用 ClassName.method() 调用，无需实例化。"),
}


# ============================================================
# 行内注释规则：按代码模式匹配，返回注释文本
# (pattern_regex, comment)。pattern 匹配整行的一部分
# ============================================================
def line_comment(line):
    """对一行代码返回行内注释（若无匹配返回 None）。"""
    s = line.strip()
    if not s or s.startswith("//") or s.startswith("/*") or s.startswith("*"):
        return None

    # 常见 API / 语法模式
    rules = [
        (r"\balert\s*\(", "浏览器弹窗（模态、阻塞），调试用，正式项目少用"),
        (r"\bconsole\.log\s*\(", "输出到浏览器控制台（≈ 后端的 print/println）"),
        (r"\bdocument\.write\s*\(", "直接写入文档流（已过时，页面加载后调用会覆盖整页）"),
        (r"\bdocument\.getElementById\s*\(", "按 id 查找 DOM 元素（id≈主键），返回该节点"),
        (r"\bdocument\.querySelector\s*\(", "用 CSS 选择器查找【第一个】匹配元素"),
        (r"\bdocument\.createElement\s*\(", "创建一个新的 DOM 元素节点（还没插入页面）"),
        (r"\bdocument\.createTextNode\s*\(", "创建文本节点"),
        (r"\.innerHTML\s*=", "设置元素内部 HTML 内容（会重新解析 HTML）"),
        (r"\.innerHTML\b", "元素内部 HTML 内容"),
        (r"\.textContent\s*=", "设置元素纯文本内容（不解析 HTML，比 innerHTML 安全）"),
        (r"\.style\.", "操作元素的内联样式"),
        (r"\.className\s*=", "设置元素的 class 属性"),
        (r"\.classList\.add\s*\(", "给元素添加 CSS 类名"),
        (r"\.appendChild\s*\(", "把节点追加为子元素（插入 DOM 树）"),
        (r"\.removeChild\s*\(", "移除指定的子节点"),
        (r"\.addEventListener\s*\(", "注册事件监听器（推荐，可绑多个，优于 onclick 属性）"),
        (r"\bonclick\s*=", "点击事件属性（绑定回调，点击时触发）"),
        (r"\bonload\s*=", "加载完成事件"),
        (r"\bonchange\s*=", "内容改变事件"),
        (r"\breturn\b.*;", "返回值给调用方（和后端 return 一致）"),
        (r"\btypeof\b", "typeof 操作符：返回变量类型字符串（判断类型的基础工具）"),
        (r"\bnew\s+Date\s*\(", "创建当前时间对象（≈ 后端的 new Date()）"),
        (r"\.getDay\s*\(", "获取星期几：0=周日、1=周一…6=周六（注意 0 是周日）"),
        (r"\.getHours\s*\(", "获取小时（0-23）"),
        (r"\.getTime\s*\(", "获取毫秒时间戳（≈ 后端 epoch millis）"),
        (r"\.toFixed\s*\(", "数字格式化为指定小数位字符串"),
        (r"\.toString\s*\(", "转为字符串"),
        (r"\.push\s*\(", "数组末尾追加元素（≈ 后端 list.add）"),
        (r"\.pop\s*\(", "数组末尾弹出元素"),
        (r"\.shift\s*\(", "数组头部弹出元素"),
        (r"\.unshift\s*\(", "数组头部追加元素"),
        (r"\.splice\s*\(", "数组增删改（万能方法，会改变原数组）"),
        (r"\.slice\s*\(", "数组/字符串切片（不改变原数组）"),
        (r"\.sort\s*\(", "排序（默认按字符串，数字排序需传比较函数，坑！）"),
        (r"\.forEach\s*\(", "遍历数组（无返回值，类似后端的 for-each）"),
        (r"\.map\s*\(", "数组映射成新数组（函数式，≈ 后端 stream.map）"),
        (r"\.filter\s*\(", "数组过滤（保留满足条件的元素）"),
        (r"\.indexOf\s*\(", "查找元素索引，找不到返回 -1"),
        (r"\.replace\s*\(", "替换匹配的子串（默认只替换第一个）"),
        (r"\.split\s*\(", "按分隔符拆成数组（≈ 后端 string.split）"),
        (r"\.charAt\s*\(", "取指定位置的字符"),
        (r"\.length\b", "长度（字符串/数组的【属性】，不带括号！Java 是方法 length()）"),
        (r"\bsetTimeout\s*\(", "延迟指定毫秒后【执行一次】回调（异步，不阻塞）"),
        (r"\bsetInterval\s*\(", "每隔指定毫秒【重复执行】回调"),
        (r"\bclearTimeout\s*\(", "取消 setTimeout 设定的定时器"),
        (r"\bclearInterval\s*\(", "取消 setInterval 设定的定时器"),
        (r"\bJSON\.parse\s*\(", "JSON 字符串 → JS 对象（≈ 后端反序列化 readValue/Unmarshal）"),
        (r"\bJSON\.stringify\s*\(", "JS 对象 → JSON 字符串（≈ 后端序列化 writeValue/Marshal）"),
        (r"\bMath\.random\s*\(", "返回 [0,1) 随机浮点数"),
        (r"\bMath\.floor\s*\(", "向下取整"),
        (r"\bMath\.ceil\s*\(", "向上取整"),
        (r"\bMath\.round\s*\(", "四舍五入"),
        (r"\bMath\.max\s*\(", "取最大值"),
        (r"\bMath\.min\s*\(", "取最小值"),
        (r"\bMath\.PI\b", "圆周率常量"),
        (r"\bnew\s+XMLHttpRequest\s*\(", "创建 HTTP 请求对象（老式 AJAX，现代用 fetch）"),
        (r"\bfetch\s*\(", "现代异步请求 API（Promise 风格，替代 XMLHttpRequest）"),
        (r"\.open\s*\(\s*[\"']GET", "配置 GET 请求"),
        (r"\.send\s*\(", "发送请求"),
        (r"\bwindow\.", "window 是浏览器全局对象（BOM 核心）"),
        (r"\blocation\.href\b", "当前页面完整 URL"),
        (r"\blocation\.reload\s*\(", "重新加载当前页面"),
        (r"\bhistory\.back\s*\(", "回到上一页"),
        (r"\bconfirm\s*\(", "确认弹窗，返回 true/false"),
        (r"\bprompt\s*\(", "输入弹窗，返回用户输入的字符串"),
        (r"\bthis\b", "this 指向【调用者】，随调用方式变化（JS 易混淆点，见第26节）"),
        (r"\bnew\s+\w+\s*\(", "new 调用构造函数创建对象（≈ 后端的 new）"),
        (r"\b__proto__\b", "对象的原型引用（指向其构造函数的 prototype）"),
        (r"\.prototype\.", "构造函数的原型：在此定义的方法被所有实例共享（≈ 实例方法）"),
        (r"\.call\s*\(", "显式指定 this 调用函数"),
        (r"\.apply\s*\(", "用数组传参、显式指定 this 调用函数"),
        (r"\bPromise\b", "Promise：表示异步操作最终结果（≈ CompletableFuture）"),
        (r"\basync\s+function\b", "async 函数：返回 Promise，内部可用 await"),
        (r"\bawait\b", "等待 Promise 完成（让异步代码像同步一样写）"),
        (r"\.then\s*\(", "Promise 成功的回调"),
        (r"\.catch\s*\(", "Promise 失败的回调"),
        (r"\buse strict\b", "启用严格模式（更严格的语法检查，推荐）"),
        (r"\btry\s*\{", "try 块：捕获可能出错的代码"),
        (r"\bcatch\s*\(", "捕获异常（JS 只有一个 catch，不区分异常类型）"),
        (r"\bthrow\b", "抛出异常（≈ 后端的 throw）"),
        (r"\bfor\s*\(", "for 循环"),
        (r"\bfor\s*\(\s*const\s+\w+\s+of\b", "for-of：遍历数组的【值】（推荐）"),
        (r"\bfor\s*\(\s*\w+\s+in\b", "for-in：遍历【键名】（遍历数组会得字符串索引，慎用！）"),
        (r"\bswitch\s*\(", "switch 分支"),
        (r"\bif\s*\(", "if 条件分支"),
        (r"\bfunction\s+\w+\s*\(", "函数声明（会提升 hoisting）"),
        (r"\bvar\s+\w+", "var 声明（函数作用域、会提升，推荐改用 let/const）"),
        (r"\blet\s+\w+", "let 声明（块作用域，推荐）"),
        (r"\bconst\s+\w+", "const 声明（块作用域常量，≈ Java final，推荐）"),
        (r"\$\s*\(", "jQuery 选择器/调用（$ 是 jQuery 的入口函数）"),
        (r"\$\.\w+\s*\(", "jQuery 工具方法调用（如 $.get）"),
    ]
    for pat, cmt in rules:
        if re.search(pat, s):
            return cmt
    return None


def make_header(section_num, demo_name, code_text, is_html):
    """生成文件头注释块。"""
    title, intro = SECTION_INTROS.get(
        section_num, (f"第 {section_num} 节", "（本节讲解待补充）")
    )
    # 检测代码特征，补充运行提示
    is_pseudo = bool(re.search(r"[一-龥]{3,}", code_text)) and len(code_text) < 200 and ("=" not in code_text)
    has_dom = "document." in code_text or "getElementById" in code_text
    is_html_like = bool(re.search(r"<(?:script|html|body|div|button|p)\b", code_text, re.I))

    lines_intro = intro.split("\n")

    if is_html:
        # HTML 注释块
        parts = []
        parts.append(f"  ============================================================")
        parts.append(f"  【第 {section_num:02d} 节 · {title}】{demo_name}")
        parts.append(f"  ============================================================")
        parts.append("")
        parts.append("  【知识点 / 后端类比】")
        for ln in lines_intro:
            parts.append(f"  {ln}")
        parts.append("")
        # 运行提示
        tips = []
        if is_html_like:
            tips.append("【运行方式】浏览器打开本文件即可。")
        if has_dom and not is_html_like:
            tips.append("【注意】含 DOM 操作，需配合 HTML 元素（或有 id 节点）才能运行，直接 node 会报错。")
        if is_pseudo:
            tips.append("【注意】本文件含教学伪代码/占位示意文字，非可直接运行程序。")
        for t in tips:
            parts.append(f"  {t}")
        return "<!--\n" + "\n".join(parts) + "\n-->\n"
    else:
        # JS 注释块
        parts = []
        parts.append("// ============================================================")
        parts.append(f"// 【第 {section_num:02d} 节 · {title}】{demo_name}")
        parts.append("// ============================================================")
        parts.append("//")
        parts.append("// 【知识点 / 后端类比】")
        for ln in lines_intro:
            parts.append(f"//   {ln}")
        parts.append("//")
        tips = []
        if has_dom:
            tips.append("【注意】含 document 等 DOM API，需在浏览器/有对应 HTML 元素时运行，直接用 node 会报 document is not defined。")
        if is_html_like and not is_html:
            tips.append("【注意】本文件含 HTML 标签（如 <script>），实际应放进 .html 文件运行，此处 runoob 仅作代码结构演示。")
        if is_pseudo:
            tips.append("【注意】本文件含教学伪代码/占位示意文字，非可直接运行程序。")
        if not has_dom and not is_html_like and not is_pseudo:
            tips.append("【运行方式】可在浏览器控制台运行；纯逻辑代码也可用 node 运行。")
        for t in tips:
            parts.append(f"//   {t}")
        return "\n".join(parts) + "\n//\n"


def annotate_js(section_num, demo_name, code_text):
    """给 .js 文件加注释。"""
    header = make_header(section_num, demo_name, code_text, is_html=False)
    # 处理每一行：美化缩进 + 行内注释
    raw_lines = code_text.splitlines()
    out = []
    for line in raw_lines:
        stripped = line.strip()
        if stripped == "":
            out.append("")
            continue
        # 已有注释的行，保留
        if "//" in stripped:
            out.append("    " + stripped if not stripped.startswith("//") else stripped)
            continue
        cmt = line_comment(stripped)
        # 简单缩进美化：以 } 开头不缩进，其余适度缩进
        if stripped.startswith(("}", "{", "<")):
            indented = stripped
        elif stripped.startswith(("var ", "let ", "const ", "function ", "if ", "for", "switch", "while", "return", "else", "try", "catch", "case", "break", "default", "throw", "new ", "document", "console", "window", "alert", "var", "}", "var", "let", "const")):
            indented = stripped
        else:
            indented = "    " + stripped
        if cmt and "//" not in stripped:
            out.append(f"{indented}  // {cmt}")
        else:
            out.append(indented)
    body = "\n".join(out).rstrip()
    return header + body + "\n"


def annotate_html(section_num, demo_name, code_text):
    """给 .html 文件加注释。保留 HTML 结构，给 <script> 内 JS 加行内注释。"""
    header = make_header(section_num, demo_name, code_text, is_html=True)
    # 给 script 内的关键行加注释
    lines = code_text.splitlines()
    out = []
    in_script = False
    for line in lines:
        s = line.strip()
        if "<script" in s and "</script>" not in s:
            in_script = True
            out.append(line)
            continue
        if "</script>" in s:
            in_script = False
            out.append(line)
            continue
        if in_script and s and not s.startswith("//") and "//" not in s:
            cmt = line_comment(s)
            if cmt:
                indent = "    "
                out.append(f"{indent}{s}  // {cmt}")
                continue
        out.append(line)
    body = "\n".join(out).rstrip()
    return header + body + "\n"


def section_dir(num):
    """找到第 num 节的目录名。"""
    for d in os.listdir(ROOT):
        if d.startswith(f"{num:02d}-"):
            return os.path.join(ROOT, d)
    return None


def main():
    only = None
    for a in sys.argv[1:]:
        if a.startswith("--only="):
            only = int(a.split("=")[1])

    total = 0
    sections = sorted(set(int(d.split("-")[0]) for d in os.listdir(ROOT)
                          if re.match(r"\d{2}-", d)))
    for num in sections:
        if only and num != only:
            continue
        sdir = section_dir(num)
        if not sdir:
            continue
        for fn in sorted(os.listdir(sdir)):
            if not re.match(r"demo\d+\.(js|html)$", fn):
                continue
            path = os.path.join(sdir, fn)
            try:
                with open(path, encoding="utf-8") as f:
                    code = f.read()
            except Exception:
                continue
            # 跳过已注释的（含文件头标记）
            if "【第 " in code and "节 ·" in code:
                continue
            demo_name = fn
            if fn.endswith(".html"):
                new = annotate_html(num, demo_name, code)
            else:
                new = annotate_js(num, demo_name, code)
            with open(path, "w", encoding="utf-8") as f:
                f.write(new)
            total += 1
        print(f"[{num:02d}] 处理完成")
    print(f"\n共注释 {total} 个文件")


if __name__ == "__main__":
    main()
