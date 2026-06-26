
import os
import re
import subprocess
import json

BASE_DIR = "/Users/zhihu/code/m_code/fullstack/learn-fullstack/node/runoob"

CHAPTERS = {
    "01-tutorial": {"name": "Node.js 教程", "url": "nodejs-tutorial.html", "concepts": ["Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境", "Node.js 使用事件驱动、非阻塞 I/O 模型", "Node.js 适合高并发、I/O 密集型应用场景", "Node.js 采用单线程模型，通过事件循环处理并发"], "runnable": False},
    "02-concepts": {"name": "Node.js 概念", "url": "nodejs-intro.html", "concepts": ["Node.js 是服务端 JavaScript 运行环境", "Node.js 基于事件驱动和非阻塞 I/O", "V8 引擎执行 JavaScript 速度非常快", "Node.js 适合构建高性能网络应用"], "runnable": False},
    "03-install": {"name": "Node.js 安装配置", "url": "nodejs-install-setup.html", "concepts": ["Node.js 支持多平台安装（Windows/Linux/macOS）", "建议使用 LTS（长期支持）版本", "安装后包含 node 和 npm 命令", "可通过 node -v 验证安装"], "runnable": False},
    "04-vscode": {"name": "Node.js VS Code", "url": "nodejs-vscode.html", "concepts": ["VS Code 是 Node.js 开发的优秀编辑器", "安装 Node.js 扩展增强开发体验", "支持调试、智能提示和代码补全", "可配置 launch.json 进行调试"], "runnable": True},
    "05-nvm": {"name": "Node.js NVM", "url": "nodejs-nvm.html", "concepts": ["NVM 用于管理多个 Node.js 版本", "可快速切换不同项目所需的 Node 版本", "常用命令：nvm install, nvm use, nvm ls", "避免全局安装版本冲突"], "runnable": False},
    "06-first-app": {"name": "Node.js 创建第一个应用", "url": "nodejs-http-server.html", "concepts": ["http.createServer() 创建 HTTP 服务器", "非阻塞 I/O 处理大量并发请求", "事件驱动：请求到达触发回调函数", "单线程 + 事件循环处理并发"], "runnable": True},
    "07-workflow": {"name": "Node.js 工作机制", "url": "how-nodejs-works.html", "concepts": ["Node.js 基于事件循环和回调机制", "非阻塞 I/O 不会等待操作完成", "libuv 库提供跨平台异步 I/O", "线程池处理部分阻塞操作（如文件系统）"], "runnable": False},
    "08-npm": {"name": "NPM 使用介绍", "url": "nodejs-npm.html", "concepts": ["NPM 是 Node.js 的包管理工具", "package.json 管理项目依赖和脚本", "npm install 安装依赖包", "node_modules 存放已安装包"], "runnable": False},
    "09-pnpm": {"name": "PNPM 使用介绍", "url": "nodejs-pnpm.html", "concepts": ["PNPM 是高效的 Node.js 包管理器", "采用内容可寻址存储节省磁盘空间", "严格依赖管理避免幽灵依赖", "比 npm/yarn 更快更省空间"], "runnable": False},
    "10-repl": {"name": "Node.js REPL", "url": "nodejs-repl.html", "concepts": ["REPL（读取-求值-输出-循环）交互式环境", "node 命令直接进入 REPL 模式", "可快速测试表达式和代码片段", "支持 .exit 退出或按两次 Ctrl+C"], "runnable": False},
    "11-async": {"name": "Node.js 异步编程", "url": "nodejs-asynchronous.html", "concepts": ["JavaScript 是单线程语言，异步处理避免阻塞", "异步编程方式：回调、Promise、async/await", "Node.js 大量 API 采用异步设计", "异步操作完成后通过事件通知主线程"], "runnable": True},
    "12-callback": {"name": "Node.js 回调函数", "url": "nodejs-callback.html", "concepts": ["回调函数是异步编程的基础", "error-first 约定：第一个参数是错误对象", "阻塞调用（Sync）vs 非阻塞调用", "回调地狱问题及解决方案"], "runnable": True},
    "13-promise": {"name": "Node.js Promise", "url": "nodejs-promise.html", "concepts": ["Promise 是异步编程的解决方案", "三种状态：pending、fulfilled、rejected", ".then() 处理成功，.catch() 处理错误", "Promise 链避免回调嵌套"], "runnable": True},
    "14-async-await": {"name": "Node.js async/await", "url": "nodejs-async-await.html", "concepts": ["async/await 是 Promise 的语法糖", "async 函数返回 Promise 对象", "await 暂停执行等待 Promise 解决", "使异步代码看起来像同步代码"], "runnable": True},
    "15-event-loop": {"name": "Node.js 事件循环", "url": "nodejs-event-loop.html", "concepts": ["事件循环是 Node.js 的核心机制", "timers 阶段执行 setTimeout/setInterval", "poll 阶段执行 I/O 回调", "process.nextTick 和 Promise 微任务"], "runnable": True},
    "16-eventemitter": {"name": "Node.js EventEmitter", "url": "nodejs-event.html", "concepts": ["EventEmitter 是发布-订阅模式的实现", "on() 注册监听器，emit() 触发事件", "事件驱动是 Node.js 的核心设计", "可构建自定义事件系统"], "runnable": True},
    "17-buffer": {"name": "Node.js Buffer", "url": "nodejs-buffer.html", "concepts": ["Buffer 用于处理二进制数据", "Buffer 是固定大小的原始内存分配", "Node.js 处理流数据时使用 Buffer", "Buffer 与字符串可相互转换"], "runnable": True},
    "18-stream": {"name": "Node.js Stream", "url": "nodejs-stream.html", "concepts": ["Stream 是连续的数据流处理抽象", "四种类型：可读、可写、双工、转换", "pipe() 方法连接多个流", "背压（backpressure）机制防止内存溢出"], "runnable": True},
    "19-module-system": {"name": "Node.js 模块系统", "url": "nodejs-module-system.html", "concepts": ["CommonJS 是 Node.js 的模块规范", "module.exports 导出模块", "require() 导入模块", "模块缓存机制提升性能"], "runnable": True},
    "20-module-import": {"name": "Node.js 模块导入", "url": "nodejs-commonjs-esm.html", "concepts": ["CommonJS（require/module.exports）与 ES Modules（import/export）", "ESM 支持静态分析和 tree-shaking", ".mjs 文件或 type: module 启用 ESM", "两种模块系统的互操作性"], "runnable": True},
    "21-function": {"name": "Node.js 函数", "url": "nodejs-function.html", "concepts": ["函数是 JavaScript 的第一类公民", "匿名函数和箭头函数简化代码", "函数作为参数传递（高阶函数）", "闭包保存函数执行上下文"], "runnable": True},
    "22-router": {"name": "Node.js 路由", "url": "nodejs-router.html", "concepts": ["路由根据 URL 路径分发请求", "解析 URL 获取路径和查询参数", "HTTP 方法（GET/POST）区分操作", "可构建简单的路由分发系统"], "runnable": True},
    "23-global": {"name": "Node.js 全局对象", "url": "nodejs-global-object.html", "concepts": ["global 是全局命名空间对象", "process 对象提供进程信息和控制", "Buffer 类无需 require 即可使用", "console、setTimeout 等也是全局可用的"], "runnable": True},
    "24-util": {"name": "Node.js 常用工具", "url": "nodejs-util.html", "concepts": ["util 模块提供实用工具函数", "util.promisify 将回调转换为 Promise", "util.inherits 实现原型继承", "util.inspect 格式化对象输出"], "runnable": True},
    "25-fs": {"name": "Node.js 文件系统", "url": "nodejs-fs.html", "concepts": ["fs 模块提供文件系统操作", "同步方法（Sync）阻塞执行，异步方法非阻塞", "流式读写适合大文件处理", "fs.promises 提供基于 Promise 的 API"], "runnable": True},
    "26-builtins": {"name": "Node.js 内置模块", "url": "nodejs-buildin-modules.html", "concepts": ["Node.js 提供丰富的内置模块", "path、os、url 等常用模块", "无需安装直接 require 使用", "查阅官方文档了解全部模块"], "runnable": True},
    "27-quiz": {"name": "Node.js 测验", "url": "nodejs-quiz.html", "concepts": ["通过测验巩固 Node.js 知识", "涵盖核心概念和常用 API", "实践是学习 Node.js 的最佳方式"], "runnable": False},
    "28-simple-app": {"name": "Node.js 构建简单应用", "url": "nodejs-build-app.html", "concepts": ["结合 HTTP 模块和文件系统构建应用", "处理 JSON 数据交换", "模块化组织代码结构", "实战演练 Node.js 基础能力"], "runnable": True},
    "29-get-post": {"name": "Node.js GET/POST 请求", "url": "node-js-get-post.html", "concepts": ["GET 请求通过 URL 查询参数传递数据", "POST 请求通过请求体传递数据", "querystring 模块解析查询字符串", "URL 模块处理 URL 路径和参数"], "runnable": True},
    "30-util-module": {"name": "Node.js util 模块", "url": "nodejs-util-module.html", "concepts": ["util.inherits 实现构造函数继承", "util.inspect 调试输出对象", "util.promisify 回调转 Promise", "util.format 格式化字符串"], "runnable": True},
    "31-web-module": {"name": "Node.js Web 模块", "url": "nodejs-web-module.html", "concepts": ["http 模块创建 Web 服务器和客户端", "url 模块解析和格式化 URL", "querystring 模块处理查询字符串", "net 模块创建 TCP 服务器"], "runnable": True},
    "32-express": {"name": "Node.js Express 框架", "url": "nodejs-express-framework.html", "concepts": ["Express 是轻量级的 Web 应用框架", "路由系统处理不同 URL 和方法", "中间件机制处理请求和响应", "模板引擎渲染动态页面"], "runnable": True},
    "33-restful": {"name": "Node.js RESTful API", "url": "nodejs-restful-api.html", "concepts": ["RESTful API 基于 HTTP 方法定义操作", "GET 获取、POST 创建、PUT 更新、DELETE 删除", "JSON 作为数据交换格式", "Express 快速构建 REST API"], "runnable": True},
    "34-multiprocess": {"name": "Node.js 多进程", "url": "nodejs-process.html", "concepts": ["child_process 模块创建子进程", "cluster 模块利用多核 CPU", "fork() 创建新的 Node.js 进程", "进程间通信（IPC）传递消息"], "runnable": True},
    "35-jxcore": {"name": "Node.js JXcore 打包", "url": "nodejs-jxcore-packaging.html", "concepts": ["JXcore 可将 Node.js 应用打包为可执行文件", "支持多平台打包", "保护源代码不被轻易查看", "注意：JXcore 已较少维护，建议评估替代方案"], "runnable": False},
    "36-mysql": {"name": "Node.js MySQL", "url": "nodejs-mysql.html", "concepts": ["mysql 模块连接 MySQL 数据库", "创建连接、执行查询、处理结果", "连接池管理数据库连接", "SQL 语句的参数化防止注入"], "runnable": True},
    "37-mongodb": {"name": "Node.js MongoDB", "url": "nodejs-mongodb.html", "concepts": ["mongodb 模块连接 MongoDB 数据库", "NoSQL 数据库使用文档存储数据", "CRUD 操作：增删改查", "MongoDB 适合灵活的数据模型"], "runnable": True},
    "38-npx": {"name": "npx 入门教程", "url": "npx-intro.html", "concepts": ["npx 是 Node.js 包运行工具", "无需全局安装即可运行包命令", "自动安装并使用最新版本", "npm 5.2.0+ 自带 npx"], "runnable": False},
}


BAD_COMMENT = "  // 使用 http.createServer() 创建 HTTP 服务器，回调函数处理每个请求"


def should_add_inline_comment(line):
    """判断是否应该给该行添加行内注释"""
    stripped = line.strip()
    if not stripped:
        return False
    if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*') or stripped.startswith('*/'):
        return False
    if stripped in ('}', ');', ')', '];', ']', '};', '})', '});', '})', ');'):
        return False
    if '  // ' in line or '\t// ' in line or ' // ' in line:
        return False
    return True


def get_comment_for_line(line, chapter_id, file_content):
    """根据代码内容返回适当的中文行内注释"""
    stripped = line.strip()
    content_lower = file_content.lower()
    
    if 'require(' in line:
        if 'http' in line:
            return '引入 Node.js 内置 http 模块，提供 HTTP 服务器和客户端功能'
        elif 'fs' in line:
            return '引入 Node.js 内置 fs（文件系统）模块，提供文件读写操作'
        elif 'events' in line:
            return '引入 Node.js 内置 events 模块，提供 EventEmitter 事件机制'
        elif 'path' in line:
            return '引入 Node.js 内置 path 模块，处理文件路径'
        elif 'url' in line:
            return '引入 Node.js 内置 url 模块，解析和格式化 URL'
        elif 'querystring' in line:
            return '引入 Node.js 内置 querystring 模块，解析查询字符串'
        elif 'util' in line:
            return '引入 Node.js 内置 util 模块，提供实用工具函数'
        elif 'child_process' in line:
            return '引入 Node.js 内置 child_process 模块，创建子进程'
        elif 'cluster' in line:
            return '引入 Node.js 内置 cluster 模块，利用多核 CPU'
        elif 'express' in line:
            return '引入 Express 框架，快速构建 Web 应用'
        elif 'mysql' in line:
            return '引入 mysql 模块，连接 MySQL 数据库'
        elif 'mongodb' in line or 'mongo' in line.lower():
            return '引入 mongodb 模块，连接 MongoDB 数据库'
        else:
            m = re.search(r"require\(['\"](.+?)['\"]\)", line)
            if m:
                return f'引入模块: {m.group(1)}'
        return None
    
    if 'http.createServer' in line:
        return '使用 http.createServer() 创建 HTTP 服务器，回调函数处理每个请求'
    
    if '.listen(' in line and ('server' in line or 'app' in line):
        return '启动服务器监听指定端口，服务器开始接收客户端请求'
    
    if 'res.end(' in line:
        return '结束响应并发送数据给客户端，必须调用否则客户端一直等待'
    if 'res.send(' in line:
        return '发送 HTTP 响应给客户端，Express 中自动处理结束'
    
    if 'res.statusCode' in line:
        return '设置 HTTP 响应状态码，200 表示请求成功'
    if 'res.setHeader' in line or 'res.writeHead' in line:
        return '设置 HTTP 响应头部，如 Content-Type 指定返回内容类型'
    
    if 'fs.readFileSync(' in line:
        return '同步读取文件，会阻塞事件循环直到读取完成，简单但影响并发'
    if 'fs.readFile(' in line:
        return '异步读取文件，不会阻塞事件循环，读取完成后通过回调函数处理结果'
    if 'fs.writeFileSync(' in line:
        return '同步写入文件，阻塞执行直到写入完成'
    if 'fs.writeFile(' in line:
        return '异步写入文件，非阻塞执行，写入完成后调用回调'
    
    if 'fs.createReadStream(' in line:
        return '创建可读流，适合大文件处理，数据分块读取不占用大量内存'
    if 'fs.createWriteStream(' in line:
        return '创建可写流，数据逐块写入目标文件'
    
    if '.pipe(' in line:
        return '使用 pipe() 将可读流数据自动传输到可写流，自动处理背压'
    
    if 'new events.EventEmitter()' in line:
        return '创建 EventEmitter 实例，实现发布-订阅模式的事件系统'
    if '.on(' in line and ('data' in line or 'end' in line or 'error' in line or 'connection' in line):
        return '注册事件监听器，当指定事件触发时执行回调函数'
    if '.emit(' in line:
        return '触发（发射）指定事件，所有注册的监听器都会收到通知'
    if '.once(' in line:
        return '注册一次性事件监听器，事件触发一次后自动移除'
    
    if 'Buffer.from(' in line or 'new Buffer(' in line:
        return '创建 Buffer 实例，用于存储二进制数据'
    if '.toString(' in line and 'buffer' in file_content.lower():
        return '将 Buffer 二进制数据转换为字符串（默认 UTF-8 编码）'
    
    if 'process.nextTick(' in line:
        return 'process.nextTick 将回调放入微任务队列，在当前操作完成后、事件循环下一阶段前执行'
    
    if 'process.argv' in line:
        return 'process.argv 获取命令行参数数组，第 0 个是 node 路径，第 1 个是脚本路径'
    
    if 'child_process.fork(' in line:
        return 'fork 创建新的 Node.js 子进程，父子进程通过 IPC 通信'
    if 'child_process.exec(' in line:
        return 'exec 执行 shell 命令，适合执行简单命令，有输出大小限制'
    if 'child_process.spawn(' in line:
        return 'spawn 启动新进程，返回流式数据，适合处理大量输出'
    
    if 'cluster.fork(' in line:
        return 'cluster.fork() 创建 Worker 子进程，每个子进程独立运行服务器副本'
    if 'cluster.isMaster' in line or 'cluster.isPrimary' in line:
        return '判断当前进程是否为主进程，主进程负责创建 Worker 子进程'
    if 'cluster.isWorker' in line:
        return '判断当前进程是否为 Worker 工作进程，负责处理客户端请求'
    
    if 'new Promise(' in line:
        return '创建 Promise 对象，封装异步操作，resolve 成功，reject 失败'
    if '.then(' in line:
        return 'Promise 成功回调，处理异步操作完成后的结果'
    if '.catch(' in line:
        return 'Promise 错误回调，捕获异步操作中的异常'
    if 'Promise.all(' in line:
        return 'Promise.all 等待所有 Promise 都完成，返回结果数组'
    
    if stripped.startswith('async ') and 'async function' in line:
        return 'async 标记函数为异步函数，返回 Promise 对象'
    if 'await ' in line:
        return 'await 暂停执行等待 Promise 解决，使异步代码看起来像同步代码'
    
    if 'function (err,' in line or 'function(err,' in line or '(err, ' in line:
        if 'err' in line and ('data' in line or 'res' in line or 'result' in line):
            return 'error-first 回调函数：第一个参数是错误对象，第二个参数是数据'
    
    if 'setTimeout(' in line:
        return 'setTimeout 设置延迟定时器，指定毫秒后执行回调一次'
    if 'setInterval(' in line:
        return 'setInterval 设置间隔定时器，每隔指定毫秒重复执行回调'
    if 'setImmediate(' in line:
        return 'setImmediate 将回调放入宏任务队列，当前事件循环结束后执行'
    
    if 'console.log(' in line:
        return '在控制台输出信息，用于调试和日志记录'
    if 'console.error(' in line:
        return '在控制台输出错误信息，stderr 流'
    
    if 'module.exports' in line:
        return '导出模块内容，供其他文件通过 require 导入使用'
    if re.match(r'^exports\.\w+\s*=', stripped):
        return '导出模块属性或方法'
    
    if 'app.get(' in line:
        return 'Express 路由定义：处理 GET 请求，指定 URL 路径和回调函数'
    if 'app.post(' in line:
        return 'Express 路由定义：处理 POST 请求'
    if 'app.use(' in line:
        return 'Express 中间件：处理请求和响应的中间层，可执行预处理'
    if 'app.listen(' in line:
        return '启动 Express 应用监听指定端口'
    
    if 'mysql.createConnection(' in line:
        return '创建 MySQL 数据库连接，配置主机、端口、用户名、密码和数据库名'
    if '.connect(' in line and 'mysql' in content_lower:
        return '建立数据库连接，连接成功后执行回调'
    if '.query(' in line and 'mysql' in content_lower:
        return '执行 SQL 查询语句，查询结果通过回调函数返回'
    if '.end(' in line and 'mysql' in content_lower:
        return '关闭数据库连接，释放资源'
    
    if 'MongoClient' in line:
        return 'MongoDB 客户端，用于连接 MongoDB 数据库服务器'
    if '.insertOne(' in line or '.insertMany(' in line:
        return '向 MongoDB 集合中插入文档数据'
    if '.find(' in line and 'mongo' in content_lower:
        return '查询 MongoDB 集合中的文档'
    if '.updateOne(' in line or '.updateMany(' in line:
        return '更新 MongoDB 集合中的文档'
    if '.deleteOne(' in line or '.deleteMany(' in line:
        return '删除 MongoDB 集合中的文档'
    
    if 'url.parse(' in line:
        return '解析 URL 字符串，提取协议、主机、路径、查询参数等'
    if 'querystring.parse(' in line:
        return '将查询字符串解析为对象，如 a=1&b=2 转为 {a:1, b:2}'
    
    if 'util.promisify(' in line:
        return 'util.promisify 将回调风格的函数转换为返回 Promise 的函数'
    if 'util.inherits(' in line:
        return 'util.inherits 实现构造函数的原型继承（Node.js 中已建议使用 ES6 class）'
    
    if 'JSON.parse(' in line:
        return '将 JSON 字符串解析为 JavaScript 对象'
    if 'JSON.stringify(' in line:
        return '将 JavaScript 对象序列化为 JSON 字符串'
    if 'parseInt(' in line:
        return '将字符串转换为整数'
    
    return None


def guess_file_description(content, filename):
    """根据代码内容猜测文件功能说明"""
    content_lower = content.lower()
    desc = "Node.js 代码示例"
    
    if 'createServer' in content:
        desc = "创建 HTTP 服务器示例"
    elif 'http.get' in content or 'http.request' in content:
        desc = "HTTP 客户端请求示例"
    elif 'fs.readfilesync' in content_lower:
        desc = "文件同步读取示例"
    elif 'fs.readfile' in content_lower:
        desc = "文件异步读取示例"
    elif 'fs.writefile' in content_lower:
        desc = "文件写入示例"
    elif 'fs.createReadStream' in content:
        desc = "可读流示例"
    elif 'fs.createWriteStream' in content:
        desc = "可写流示例"
    elif 'fs.readdir' in content:
        desc = "读取目录示例"
    elif 'fs.mkdir' in content:
        desc = "创建目录示例"
    elif 'fs.unlink' in content:
        desc = "删除文件示例"
    elif 'fs.stat' in content:
        desc = "获取文件信息示例"
    elif 'fs.watch' in content:
        desc = "文件监视示例"
    elif 'eventemitter' in content_lower or 'new events.EventEmitter' in content:
        desc = "EventEmitter 事件处理示例"
    elif 'buffer' in content_lower and 'Buffer' in content:
        desc = "Buffer 二进制数据处理示例"
    elif 'promise' in content_lower and 'Promise' in content:
        desc = "Promise 异步处理示例"
    elif 'async' in content_lower and 'await' in content_lower:
        desc = "async/await 异步处理示例"
    elif 'callback' in content_lower or ('function (' in content and 'err' in content_lower):
        desc = "回调函数示例"
    elif 'child_process' in content_lower:
        desc = "子进程示例"
    elif 'cluster' in content_lower and 'Cluster' in content:
        desc = "Cluster 多进程示例"
    elif 'express' in content_lower or 'Express' in content:
        desc = "Express 框架示例"
    elif 'require' in content and 'exports' in content:
        desc = "模块导出/导入示例"
    elif 'require' in content:
        desc = "模块导入示例"
    elif 'process.argv' in content:
        desc = "命令行参数处理示例"
    elif 'process.nextTick' in content:
        desc = "process.nextTick 微任务示例"
    elif 'setTimeout' in content or 'setInterval' in content or 'setImmediate' in content:
        desc = "定时器示例"
    elif 'console' in content:
        desc = "控制台输出示例"
    
    return desc


def build_jsdoc_header(chapter_id, chapter_name, url, filename):
    m = re.match(r'example_(\d+)', filename)
    example_num = f" 代码示例 {m.group(1)}" if m else ""
    return f"""/**
 * {chapter_id}-{chapter_name}{example_num}
 *
 * 来源: 菜鸟教程 https://www.runoob.com/nodejs/{url}
 * 说明: {guess_file_description('', filename)}
 */

"""


def process_all_files():
    stats = {
        "chapters": 0,
        "js_files_with_header_added": 0,
        "js_files_with_comments_added": 0,
        "readmes_updated": 0,
        "syntax_errors": 0
    }
    
    for chapter_id in sorted(CHAPTERS.keys()):
        chapter_dir = os.path.join(BASE_DIR, chapter_id)
        if not os.path.isdir(chapter_dir):
            continue
        
        stats["chapters"] += 1
        chapter_info = CHAPTERS[chapter_id]
        
        for fname in sorted(os.listdir(chapter_dir)):
            if not fname.endswith('.js'):
                continue
            
            fpath = os.path.join(chapter_dir, fname)
            with open(fpath, 'r', encoding='utf-8') as f:
                original = f.read()
            
            content = original
            changed = False
            
            # 1. 添加 JSDoc 头（如果还没有）
            # 检查是否已经有 JSDoc 头（严格以 /** 开头）
            if not content.strip().startswith('/**'):
                # 如果文件已有顶部注释，保留它们，但在前面加 JSDoc 头
                header = build_jsdoc_header(chapter_id, chapter_info['name'], chapter_info['url'], fname)
                # 找到第一个非空行，如果它是注释行，保留
                lines = content.split('\n')
                first_content_idx = 0
                for i, line in enumerate(lines):
                    if line.strip():
                        first_content_idx = i
                        break
                # 保留所有顶部注释
                top_comments = []
                for i in range(first_content_idx, len(lines)):
                    stripped = lines[i].strip()
                    if stripped.startswith('//') or stripped.startswith('/*'):
                        top_comments.append(lines[i])
                    else:
                        break
                # 如果顶部注释后面紧跟空行，也包含
                end_idx = len(top_comments) + first_content_idx
                while end_idx < len(lines) and not lines[end_idx].strip():
                    end_idx += 1
                
                remaining = '\n'.join(lines[end_idx:])
                if remaining:
                    content = header + '\n'.join(top_comments) + '\n\n' + remaining
                else:
                    content = header + '\n'.join(top_comments)
                changed = True
                stats["js_files_with_header_added"] += 1
            
            # 2. 修复行内注释：移除错误注释，添加正确注释
            # 先移除错误注释（如果有）
            if BAD_COMMENT in content:
                content = content.replace(BAD_COMMENT, '')
                changed = True
            
            # 逐行添加正确注释
            lines = content.split('\n')
            new_lines = []
            for line in lines:
                if should_add_inline_comment(line):
                    comment = get_comment_for_line(line, chapter_id, content)
                    if comment:
                        line = line.rstrip() + '  // ' + comment
                        changed = True
                new_lines.append(line)
            content = '\n'.join(new_lines)
            
            # 3. 写回文件
            if changed:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                if not content.strip().startswith('/**') or BAD_COMMENT in original or any(l != new_l for l, new_l in zip(original.split('\n'), content.split('\n'))):
                    stats["js_files_with_comments_added"] += 1
        
        # 4. 更新 README
        if build_readme(chapter_dir, chapter_id, chapter_info):
            stats["readmes_updated"] += 1
    
    # 5. 验证语法
    result = subprocess.run(
        ['bash', '-c', 
         'cd /Users/zhihu/code/m_code/fullstack/learn-fullstack/node/runoob && '
         'for d in */; do for f in "$d"*.js; do if [ -f "$f" ]; then node --check "$f" 2>/dev/null || echo "❌ $f"; fi; done; done'],
        capture_output=True, text=True
    )
    
    syntax_output = result.stdout.strip()
    if syntax_output:
        errors = [line for line in syntax_output.split('\n') if line.startswith('❌')]
        stats["syntax_errors"] = len(errors)
        stats["error_details"] = errors
    else:
        stats["error_details"] = []
    
    return stats


def build_readme(chapter_dir, chapter_id, chapter_info):
    """构建或更新 README.md"""
    readme_path = os.path.join(chapter_dir, 'README.md')
    
    files = []
    for fname in sorted(os.listdir(chapter_dir)):
        fpath = os.path.join(chapter_dir, fname)
        if os.path.isfile(fpath) and not fname.endswith('.md'):
            ext = os.path.splitext(fname)[1]
            if ext == '.json':
                ftype = 'JSON 数据'
            elif ext == '.html':
                ftype = 'HTML 页面'
            elif ext == '.js':
                ftype = 'JavaScript 代码'
            else:
                ftype = '其他文件'
            
            try:
                with open(fpath, 'r', encoding='utf-8') as f:
                    content = f.read()
                desc = guess_file_description(content, fname)
            except:
                desc = ftype
            
            files.append((fname, ftype, desc))
    
    lines = []
    lines.append(f"# {chapter_info['name']}")
    lines.append("")
    lines.append(f"> 来源: https://www.runoob.com/nodejs/{chapter_info['url']}")
    lines.append("")
    
    lines.append("## 核心概念")
    lines.append("")
    for i, concept in enumerate(chapter_info['concepts'], 1):
        lines.append(f"{i}. {concept}")
    lines.append("")
    
    lines.append("## 文件说明")
    lines.append("")
    lines.append("| 文件名 | 类型 | 说明 |")
    lines.append("|--------|------|------|")
    for fname, ftype, desc in files:
        lines.append(f"| {fname} | {ftype} | {desc} |")
    lines.append("")
    
    if chapter_info['runnable']:
        js_files = [f for f, t, d in files if t == 'JavaScript 代码']
        if js_files:
            lines.append("## 运行方法")
            lines.append("")
            lines.append("确保已安装 Node.js，然后在终端执行：")
            lines.append("")
            for fname in js_files:
                lines.append(f"```bash")
                lines.append(f"cd {chapter_id}")
                lines.append(f"node {fname}")
                lines.append(f"```")
                lines.append("")
    
    content = '\n'.join(lines) + '\n'
    
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(content)
    return True


if __name__ == '__main__':
    stats = process_all_files()
    print(json.dumps(stats, ensure_ascii=False, indent=2))
