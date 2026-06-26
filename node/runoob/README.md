# Node.js 教程学习项目

基于 [菜鸟教程 Node.js 教程](https://www.runoob.com/nodejs/nodejs-tutorial.html) 的学习项目，所有源码附带详细中文注释。

## 目录结构（38 章）

```
node/runoob/
├── 01-tutorial/              # Node.js 教程 - 教程概览、适用人群
├── 02-concepts/              # Node.js 概念 - V8引擎、事件驱动、非阻塞I/O
├── 03-install/               # Node.js 安装配置 - 各平台安装方法
├── 04-vscode/                # Node.js VS Code - 编辑器配置、调试
├── 05-nvm/                   # Node.js NVM - 版本管理工具
├── 06-first-app/             # Node.js 创建第一个应用 - HTTP 服务器 ⭐
├── 07-workflow/              # Node.js 工作机制 - V8引擎、Libuv、事件循环架构
├── 08-npm/                   # NPM 使用介绍 - package.json、依赖管理、脚本 ⭐
├── 09-pnpm/                  # PNPM 使用介绍 - 硬链接、存储优化
├── 10-repl/                  # Node.js REPL - 交互式解释器
├── 11-async/                 # Node.js 异步编程 - 回调→Promise→async/await 演进 ⭐
├── 12-callback/              # Node.js 回调函数 - 同步/异步、错误优先、回调地狱 ⭐
├── 13-promise/               # Node.js Promise - 状态、链式调用、all/race ⭐
├── 14-async-await/           # Node.js async/await - 语法糖、错误捕获、并行 ⭐
├── 15-event-loop/            # Node.js 事件循环 - 宏任务/微任务、nextTick、setImmediate ⭐
├── 16-eventemitter/          # Node.js EventEmitter - 发布订阅、事件继承 ⭐
├── 17-buffer/                # Node.js Buffer - 二进制数据处理、编码转换 ⭐
├── 18-stream/                # Node.js Stream - 可读流、可写流、管道、背压 ⭐
├── 19-module-system/         # Node.js 模块系统 - CommonJS、require、exports、缓存 ⭐
├── 20-module-import/         # Node.js 模块导入 - CommonJS vs ESM、.mjs、互操作 ⭐
├── 21-function/              # Node.js 函数 - 声明、箭头函数、闭包、高阶函数 ⭐
├── 22-router/                # Node.js 路由 - URL解析、querystring、路由分发 ⭐
├── 23-global/                # Node.js 全局对象 - __dirname、process、global、console ⭐
├── 24-util/                  # Node.js 常用工具 - inherits、promisify、inspect ⭐
├── 25-fs/                    # Node.js 文件系统 - 读写、流、监控、权限 ⭐
├── 26-builtins/              # Node.js 内置模块 - path、os、url、crypto、dns ⭐
├── 27-quiz/                  # Node.js 测验 - 知识检验（无代码）
├── 28-simple-app/            # Node.js 构建简单应用 - 静态文件服务、安全路由 ⭐
├── 29-get-post/              # Node.js GET/POST请求 - querystring、body-parser ⭐
├── 30-util-module/           # Node.js util 模块 - inspect、inherits、promisify、deprecate ⭐
├── 31-web-module/            # Node.js Web 模块 - http.createServer、URL解析 ⭐
├── 32-express/               # Node.js Express 框架 - 路由、中间件、静态文件 ⭐⭐
├── 33-restful/               # Node.js RESTful API - GET/POST/PUT/DELETE/状态码 ⭐⭐
├── 34-multiprocess/          # Node.js 多进程 - exec、spawn、fork、cluster ⭐
├── 35-jxcore/                # Node.js JXcore 打包 - 已废弃，简要说明
├── 36-mysql/                 # Node.js MySQL - 连接、查询、连接池、CRUD ⭐⭐
├── 37-mongodb/               # Node.js MongoDB - 连接、CRUD、聚合、Mongoose ⭐⭐
├── 38-npx/                   # npx 入门教程 - 临时执行、避免全局安装 ⭐
└── README.md                 # 本文件
```

## 可运行章节

带 ⭐ 的章节有 `demo.js` 或 `server.js` 等可直接运行的文件：

```bash
# 进入任意可运行章节
cd 06-first-app
node server.js
# 浏览器打开 http://localhost:8080
```

```bash
cd 12-callback
node demo.js
```

```bash
cd 32-express
npm install express
node demo.js
```

```bash
cd 36-mysql
npm install mysql
node demo.js
# 需要本地 MySQL 服务
```

```bash
cd 37-mongodb
npm install mongodb
node demo.js
# 需要本地 MongoDB 服务
```

## 学习路线

| 阶段 | 章节 | 目标 |
|------|------|------|
| **环境准备** | 01-05 | 了解 Node.js 是什么，安装开发环境 |
| **核心基础** | 06-10 | 创建第一个应用，理解 REPL、异步编程基础 |
| **异步深入** | 11-16 | 掌握回调 → Promise → async/await 演进，理解事件循环和 EventEmitter |
| **核心模块** | 17-26 | 掌握 Buffer、Stream、模块系统、文件系统、内置模块 |
| **Web 开发** | 28-33 | 构建 Web 应用，掌握路由、Express、RESTful API |
| **数据库** | 36-37 | 连接 MySQL 和 MongoDB，掌握数据库操作 |
| **工具进阶** | 34-35, 38 | 多进程、打包、npx 临时执行 |

## 核心知识点速查

| 概念 | 说明 | 相关章节 |
|------|------|---------|
| 非阻塞 I/O | 单线程通过事件循环处理并发，不会阻塞主线程 | 02, 07, 15 |
| 事件驱动 | 请求到达触发事件，回调函数处理 | 06, 16 |
| 事件循环 | 宏任务 → 微任务 → nextTick → setImmediate | 15 |
| 回调函数 | 异步操作的完成通知，错误优先 (err, data) | 12 |
| Promise | 解决回调地狱，链式调用，三种状态 | 13 |
| async/await | Promise 语法糖，同步写法异步执行 | 14 |
| Buffer | 二进制数据缓冲区，处理非 UTF-8 数据 | 17 |
| Stream | 数据流处理，pipe 管道连接，背压控制 | 18 |
| CommonJS | require/module.exports，模块缓存 | 19 |
| ESM | import/export，静态分析， tree-shaking | 20 |
| EventEmitter | 发布订阅模式，on/once/emit | 16 |
| Express | Web 框架，路由 + 中间件 + 模板引擎 | 32 |
| RESTful API | 资源 URL + HTTP 方法（GET/POST/PUT/DELETE）| 33 |
| child_process | exec/spawn/fork 多进程 | 34 |
| cluster | 主从模式，多核利用 | 34 |

## 注释风格

所有代码文件遵循统一注释规范：

```js
/**
 * [章节编号]-[章节名] - [文件用途]
 *
 * 核心概念：
 * 1. [概念1] - [解释]
 * 2. [概念2] - [解释]
 *
 * 注意事项：
 * - [陷阱/要点]
 */
```

行内注释说明 Node.js 机制：
```js
// http.createServer 创建服务器，返回 Server 实例
// 非阻塞 I/O：请求不会阻塞主线程，事件循环调度回调
// Buffer 是 Node.js 处理二进制数据的核心，不依赖 V8 堆内存
// Stream 的 pipe 方法自动处理背压（backpressure），防止内存溢出
// require 的模块会被缓存，多次 require 返回同一实例
// 事件循环中，process.nextTick 的优先级高于 Promise 微任务
```

## 官方资源

- [Node.js 官方文档](https://nodejs.org/docs/latest/api/)
- [Node.js 中文文档](https://nodejs.cn/)
- [npm 官方文档](https://docs.npmjs.com/)
- [Express 官方文档](https://expressjs.com/)

---

基于菜鸟教程整理，仅供学习使用。
