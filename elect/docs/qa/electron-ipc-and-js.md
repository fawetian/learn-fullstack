# Electron IPC 与 JS 基础问答

本文整理学习 Electron `04-core-concepts` ~ `13-performance` 过程中的问答，涵盖 IPC 通信、JS 异步/作用域、代码风格与打包性能等。

## 目录

1. [为什么 `window.electronAPI` 写代码时没有自动补全提示？](#1-为什么-windowelectronapi-写代码时没有自动补全提示)
2. [`await window.electronAPI.getAppPath()` 是怎么触发的？](#2-await-windowelectronapigetapppath-是怎么触发的)
3. [我怎么知道 `getAppPath` 对应的 channel 是 `get-app-path`？](#3-我怎么知道-getapppath-对应的-channel-是-get-app-path)
4. [`invoke/handle` 的区别是什么？](#4-invokehandle-的区别是什么)
5. [`async` 和 `await` 介绍](#5-async-和-await-介绍)
6. [`let mainWindow;` 这行的意义是什么？](#6-let-mainwindow-这行的意义是什么)
7. [为什么 TS 的很多函数参数采用多行？](#7-为什么-ts-的很多函数参数采用多行)
8. [asar 打包是什么？](#8-asar-打包是什么)
9. [Web Worker 是什么？](#9-web-worker-是什么)

---

## 1. 为什么 `window.electronAPI` 写代码时没有自动补全提示？

### 问题

在 `index.html` 里写 `window.electronAPI.` 时编辑器没有补全提示（不弹出 `sendPing` / `getAppPath`）。

### 回答

`window.electronAPI` 是**运行时**才由 `preload.js` 的 `contextBridge.exposeInMainWorld` 注入到页面里的。而编辑器做的是**静态分析**，它不知道 `window` 上存在 `electronAPI` 属性，所以没有补全、甚至可能报红线。这跟代码能不能跑无关，纯粹是缺少**类型声明**。

**解决办法：加类型声明文件。**

`electron-api.d.ts`：

```ts
export {}; // 让本文件成为模块

declare global {
  interface Window {
    electronAPI: {
      sendPing: (data: string) => void;
      getAppPath: () => Promise<string>;
    };
  }
}
```

`jsconfig.json`（让编辑器把 `.d.ts` 纳入项目）：

```json
{
  "compilerOptions": {
    "checkJs": true,
    "target": "ES2020",
    "module": "CommonJS"
  },
  "include": ["**/*.js", "**/*.d.ts"]
}
```

加完后 `Reload Window` 或 `Restart TS Server` 即可生效。若 HTML 内联 `<script>` 仍不提示，最稳的做法是把脚本抽到外部 `renderer.js` 再用 `<script src>` 引入——外部 `.js` 文件的类型补全比 HTML 内联更可靠。

---

## 2. `await window.electronAPI.getAppPath()` 是怎么触发的？

### 问题

`index.html` 里 `const path = await window.electronAPI.getAppPath();` 这行是怎么触发的？

### 回答

它不是页面加载就执行，而是包在一个**按钮点击事件回调**里，点击 `id="getPath"` 的按钮才会跑。

完整调用链（双向通信 invoke/handle）：

```
[点击按钮]
   ↓ click 事件
index.html: window.electronAPI.getAppPath()
   ↓
preload.js: ipcRenderer.invoke('get-app-path')   ──IPC请求──►  main.js: ipcMain.handle('get-app-path')
                                                                          ↓ app.getPath('userData')
await 拿到 path  ◄──IPC返回(Promise)──────────────────────────────  return userDataPath
   ↓
显示到页面 <p id="pathResult">
```

1. **渲染进程发起**：`window.electronAPI.getAppPath()`（`electronAPI` 是 preload 注入的桥接对象）。
2. **preload 转发**：`getAppPath: () => ipcRenderer.invoke('get-app-path')`，通过 IPC 把请求发给主进程，返回 `Promise`。
3. **主进程处理**：`ipcMain.handle('get-app-path', ...)` 监听到请求，执行 `app.getPath('userData')` 并 `return`。
4. **返回值回到渲染进程**：返回值序列化后通过 `Promise` 传回，`await` 取出赋给 `path`，再显示到页面。

关键点：`invoke` 和 `handle` 靠字符串 channel 名配对，两边必须一致。

---

## 3. 我怎么知道 `getAppPath` 对应的 channel 是 `get-app-path`？

### 问题

怎么知道 `getAppPath` 对应的 IPC channel 是 `get-app-path`？

### 回答

关键认知：**`getAppPath` 和 `'get-app-path'` 之间没有任何"自动"关系，是人手动用字符串绑起来的。** 去 `preload.js` 看 `getAppPath` 的定义就知道：

```js
getAppPath: () => ipcRenderer.invoke('get-app-path')
```

这里其实有 **3 个互相独立、可随便改的名字**：

| 名字 | 在哪定义 | 作用 |
|------|---------|------|
| `electronAPI` | `exposeInMainWorld('electronAPI', ...)` | 挂到 `window` 上的对象名 |
| `getAppPath` | preload 对象的 key | 渲染进程调用的函数名 |
| `'get-app-path'` | `ipcRenderer.invoke('...')` 的参数 | IPC 通道名（**真正用来配对的**） |

能否通信只取决于 `invoke` 的字符串和 `handle` 的字符串是否完全一致。追踪一个调用的正确顺序：

1. 渲染进程 `window.electronAPI.getAppPath()` → 去 `preload.js` 找 `getAppPath`
2. 在 `preload.js` 看到它调用 `invoke('get-app-path')` → 拿到 channel 名
3. 拿 channel 名去 `main.js` 搜 `ipcMain.handle('get-app-path'` → 找到真正干活的代码

`preload.js` 就是连接"前端函数名"和"IPC channel 名"的对照表。

---

## 4. `invoke/handle` 的区别是什么？

### 问题

`invoke` 和 `handle` 的区别是什么？

### 回答

先纠正一个误会：**`invoke` 和 `handle` 不是对立关系，而是一次"双向通信"的两端**——一个发、一个收。真正成对对比的是 `invoke/handle`（双向）和 `send/on`（单向）。

invoke 和 handle 各自的角色：

| | `ipcRenderer.invoke(channel, args)` | `ipcMain.handle(channel, fn)` |
|---|---|---|
| 在哪边 | 渲染进程（preload） | 主进程（main.js） |
| 干什么 | **发起**请求并等结果 | **接收**请求，处理后**返回**结果 |
| 返回 | 返回一个 `Promise` | 函数返回值会被送回去 |

真正的区别：invoke/handle（双向） vs send/on（单向）：

| 对比项 | `send` / `on`（单向） | `invoke` / `handle`（双向） |
|--------|---------------------|---------------------------|
| 方向 | 渲染 → 主，发了就不管 | 渲染 → 主 → 渲染，有来有回 |
| 返回值 | **没有** | **有**（主进程 `return` 的值传回） |
| 渲染进程写法 | `ipcRenderer.send('ping', data)` | `await ipcRenderer.invoke('get-app-path')` |
| 主进程写法 | `ipcMain.on('ping', (e, arg) => {})` | `ipcMain.handle('get-app-path', () => {...})` |
| 拿结果 | 拿不到（要回复得另开通道 `event.reply`） | 直接 `await` 拿返回值 |
| 场景 | 通知、日志、状态上报 | 查数据、读文件、要结果的请求 |

一句话记忆：**`invoke/handle` 像"问问题等回答"，`send/on` 像"喊一嗓子就走"。**

---

## 5. `async` 和 `await` 介绍

### 问题

介绍一下 `async` 和 `await`。

### 回答

- **`async`**：放在函数前面，声明这是异步函数，返回值会自动变成 `Promise`。
- **`await`**：放在 `Promise` 前面，"等它有结果了再往下走"，并直接把结果取出来。`await` 只能用在 `async` 函数里。

**为什么需要**：有些操作不是立刻完成的（IPC 通信、网络请求 `fetch`、读文件），它们返回 `Promise`——可以理解成"取餐小票"：不是马上给你饭，而是给你张票，饭好了凭票取。

结合项目代码：

```js
document.getElementById('getPath').addEventListener('click', async () => {
  const path = await window.electronAPI.getAppPath();
  document.getElementById('pathResult').textContent = 'App Path: ' + path;
});
```

1. 回调用了 `await`，所以必须标 `async`。
2. `getAppPath()` 不会立刻返回路径，而是返回 `Promise`。
3. `await` 在这里"停下来等"，等主进程把路径传回再取出赋给 `path`。
4. 拿到后才执行后面显示的代码。

**不用 await 会怎样**：`const path = window.electronAPI.getAppPath();` 拿到的是 `Promise {<pending>}`（小票本身），页面会显示 `[object Promise]`。

**和 `.then()` 等价**（async/await 是 `.then()` 的语法糖）：

```js
// async/await（像同步代码，好读）
const path = await window.electronAPI.getAppPath();

// .then()（回调风格）
window.electronAPI.getAppPath().then((path) => { /* ... */ });
```

**错误处理**用熟悉的 try/catch：

```js
try {
  const path = await window.electronAPI.getAppPath();
} catch (err) {
  console.error('获取路径失败:', err);
}
```

记忆口诀：要"等结果"的操作多半返回 `Promise` → 想拿结果就加 `await` → 用了 `await` 函数前面就要加 `async`。

---

## 6. `let mainWindow;` 这行的意义是什么？

### 问题

`05-architecture/main.js` 里 `let mainWindow;` 这行的意义是什么？

### 回答

核心意义：**把窗口对象存到一个"所有函数都能访问"的地方**（模块作用域），这样后面的 IPC 处理函数也能用到它。

`mainWindow` 在文件里被用在两个不同的函数里：

- 在 `createWindow()` 里被赋值：`mainWindow = new BrowserWindow({...})`
- 在 `select-file` 的 IPC 处理函数里被使用：`dialog.showOpenDialog(mainWindow, {...})`（第一个参数是"父窗口"，让对话框挂在该窗口上居中弹出）

**作用域问题**：如果写在 `createWindow` 函数内部用 `const mainWindow = ...`，出了函数变量就消失，IPC 处理函数访问不到，会报 `mainWindow is not defined`。所以做法是：

1. 最外层先声明 `let mainWindow;`（此时是 `undefined`）。
2. 在 `createWindow()` 里 `mainWindow = ...` 给外层变量赋值（注意没有 `let`）。
3. IPC 处理函数后续就能读到这个窗口引用。

**为什么用 `let` 不用 `const`**：声明时还没有值（窗口还没创建），要等 `createWindow()` 执行才赋值；`const` 必须声明时赋值且不可改，所以用 `let`。

一句话：把窗口引用提升到模块级作用域，让"创建窗口的函数"和"之后所有 IPC 处理函数"共享同一个窗口对象——典型的"跨函数共享状态"写法。

---

## 7. 为什么 TS 的很多函数参数采用多行？

### 问题

为什么 `.d.ts`（如 `electron.d.ts`）里很多函数参数采用多行写法？

### 回答

这不是 TS 特有的，而是通用排版习惯，主要原因：

1. **参数太多/太长一行放不下**：带完整类型注解的参数很长，拆成多行后每个参数的名字和类型一眼看清。
2. **格式化工具（Prettier）自动这么排**：按 `printWidth`（默认 80 字符），超了就自动把每个参数拆成单独一行。`.d.ts` 是工具生成的，自然遵循。
3. **diff 更友好**：每个参数独占一行，增删一个参数时 Git diff 只显示那一行变化。
4. **可给单个参数加注释/JSDoc**。
5. **尾逗号（trailing comma）**：多行时最后一个参数后常有逗号，配合上一点让加新参数时不用动上一行，diff 更干净。

一句话：**短就单行，长就多行**，目的是更好读、diff 更干净，基本由 Prettier 按 80 字符宽度自动决定。

---

## 8. asar 打包是什么？

### 问题

`13-performance/README.md` 里"使用 asar 打包减少文件散乱"是什么意思？

### 回答

`asar` 是 Electron 自带的一种**打包归档格式**（类似 `.tar`/`.zip`，但不压缩），把应用的一堆零散文件**合并成一个单独文件**。

**解决的问题**：Electron 应用代码通常是成千上万个零散小文件（尤其 `node_modules`），直接发布会有：文件太多太散拷贝慢、Windows 路径过长报错、源码完全裸露。

**做法**：打包时把文件塞进一个 `app.asar`（放在 `resources/` 下）。运行时 Electron 能直接读 `app.asar` 里的文件，代码几乎不用改，`require` / `fs.readFile` 照常用。

要点：

| 方面 | 说明 |
|------|------|
| 压缩 | 不压缩，只合并（体积基本不变，主要减少文件数量） |
| 加密 | 不加密，`asar extract` 就能解开，**不能当安全手段** |
| 性能 | 文件数量少，读取和分发更快 |
| 怎么开启 | `electron-builder` / `electron-packager` 打包时默认就生成，无需手动 |

对应文档语境：发布应用时把代码归档成单个 `app.asar`，避免几万个零散文件，让分发更干净、加载更高效（参考 `16-release` / `17-packaging`）。

---

## 9. Web Worker 是什么？

### 问题

`13-performance/README.md` 里"使用 Web Workers 处理 CPU 密集型任务"中的 Web Worker 是什么？

### 回答

`Web Worker` 是浏览器（及 Electron 渲染进程）提供的**在后台线程里跑 JavaScript** 的机制，用来解决"JS 单线程，干重活会卡界面"的问题。

**问题**：渲染进程里 JS 默认单线程，既跑逻辑又负责界面渲染、响应点击。一段很耗时的计算会让整个界面卡死（页面无响应）。

**做法**：把重活丢到另一个线程跑，主线程继续流畅响应界面：

```js
// 主线程
const worker = new Worker('heavy-task.js');
worker.postMessage({ numbers: [1, 2, 3] });
worker.onmessage = (e) => { console.log('计算结果:', e.data); };
```

```js
// heavy-task.js（worker 里运行，独立线程）
onmessage = (e) => {
  const result = doHeavyCalculation(e.data.numbers);
  postMessage(result);
};
```

主线程和 worker 通过 `postMessage` / `onmessage` 互发消息通信（思路和 IPC 一样：不同线程/进程不共享变量，靠消息传递）。

特点 / 限制：

| 特点 | 说明 |
|------|------|
| 独立线程 | 重计算不阻塞 UI |
| 不能碰 DOM | worker 里没有 `document` / `window`，只管算，算完发回主线程更新界面 |
| 不共享内存 | 靠 `postMessage` 传数据（数据会被拷贝） |
| 适用场景 | 大量计算、大 JSON 解析、图片/视频处理、加解密等 |

**易混点区分**：

- **Web Worker**：解决渲染进程内部"计算卡 UI"的问题，是**线程**。
- **Electron 主进程 / IPC**：解决"界面进程 ↔ 系统能力"的问题，是**进程**。

两者都用消息传递通信，但层级不同：Web Worker 在渲染进程内部再开线程，主进程是另一个进程。
