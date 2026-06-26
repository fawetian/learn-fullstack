# Node.js 创建第一个应用

> 来源: https://www.runoob.com/nodejs/nodejs-http-server.html

## 核心概念

1. http.createServer() 创建 HTTP 服务器
2. 非阻塞 I/O 处理大量并发请求
3. 事件驱动：请求到达触发回调函数
4. 单线程 + 事件循环处理并发

## 文件说明

| 文件名 | 类型 | 说明 |
|--------|------|------|
| client.js | JavaScript 代码 | HTTP 客户端请求示例 |
| example_1.js | JavaScript 代码 | 创建 HTTP 服务器示例 |
| example_2.js | JavaScript 代码 | 模块导入示例 |
| example_3.js | JavaScript 代码 | 模块导入示例 |
| server.js | JavaScript 代码 | 创建 HTTP 服务器示例 |

## 运行方法

确保已安装 Node.js，然后在终端执行：

```bash
cd 06-first-app
node client.js
```

```bash
cd 06-first-app
node example_1.js
```

```bash
cd 06-first-app
node example_2.js
```

```bash
cd 06-first-app
node example_3.js
```

```bash
cd 06-first-app
node server.js
```

