# Node.js 多进程

> 来源: https://www.runoob.com/nodejs/nodejs-process.html

## 核心概念

1. child_process 模块创建子进程
2. cluster 模块利用多核 CPU
3. fork() 创建新的 Node.js 进程
4. 进程间通信（IPC）传递消息

## 文件说明

| 文件名 | 类型 | 说明 |
|--------|------|------|
| example_1.js | JavaScript 代码 | 命令行参数处理示例 |
| example_2.js | JavaScript 代码 | 回调函数示例 |
| example_3.js | JavaScript 代码 | 创建 HTTP 服务器示例 |
| example_4.js | JavaScript 代码 | Promise 异步处理示例 |
| example_5.js | JavaScript 代码 | Node.js 代码示例 |
| example_6.js | JavaScript 代码 | Promise 异步处理示例 |
| example_7.js | JavaScript 代码 | Promise 异步处理示例 |
| example_8.js | JavaScript 代码 | 创建 HTTP 服务器示例 |

## 运行方法

确保已安装 Node.js，然后在终端执行：

```bash
cd 34-multiprocess
node example_1.js
```

```bash
cd 34-multiprocess
node example_2.js
```

```bash
cd 34-multiprocess
node example_3.js
```

```bash
cd 34-multiprocess
node example_4.js
```

```bash
cd 34-multiprocess
node example_5.js
```

```bash
cd 34-multiprocess
node example_6.js
```

```bash
cd 34-multiprocess
node example_7.js
```

```bash
cd 34-multiprocess
node example_8.js
```

