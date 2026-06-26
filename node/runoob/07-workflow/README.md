# Node.js 工作机制

> 来源: https://www.runoob.com/nodejs/how-nodejs-works.html

## 核心概念

1. Node.js 基于事件循环和回调机制
2. 非阻塞 I/O 不会等待操作完成
3. libuv 库提供跨平台异步 I/O
4. 线程池处理部分阻塞操作（如文件系统）

## 文件说明

| 文件名 | 类型 | 说明 |
|--------|------|------|
| example_1.js | JavaScript 代码 | 定时器示例 |
| example_2.js | JavaScript 代码 | 子进程示例 |
| example_3.js | JavaScript 代码 | 创建 HTTP 服务器示例 |
| example_4.js | JavaScript 代码 | 模块导入示例 |
| example_5.js | JavaScript 代码 | 文件异步读取示例 |

