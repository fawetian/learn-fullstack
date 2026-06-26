# Node.js 事件循环

> 来源: https://www.runoob.com/nodejs/nodejs-event-loop.html

## 核心概念

1. 事件循环是 Node.js 的核心机制
2. timers 阶段执行 setTimeout/setInterval
3. poll 阶段执行 I/O 回调
4. process.nextTick 和 Promise 微任务

## 文件说明

| 文件名 | 类型 | 说明 |
|--------|------|------|
| example_1.js | JavaScript 代码 | 回调函数示例 |
| example_2.js | JavaScript 代码 | Promise 异步处理示例 |
| example_3.js | JavaScript 代码 | 回调函数示例 |
| example_4.js | JavaScript 代码 | EventEmitter 事件处理示例 |
| example_5.js | JavaScript 代码 | EventEmitter 事件处理示例 |
| example_7.js | JavaScript 代码 | 文件异步读取示例 |

## 运行方法

确保已安装 Node.js，然后在终端执行：

```bash
cd 15-event-loop
node example_1.js
```

```bash
cd 15-event-loop
node example_2.js
```

```bash
cd 15-event-loop
node example_3.js
```

```bash
cd 15-event-loop
node example_4.js
```

```bash
cd 15-event-loop
node example_5.js
```

```bash
cd 15-event-loop
node example_7.js
```

