/**
 * 04-core-concepts - Electron 核心概念演示
 * 
 * 本文件演示 Electron 的两大核心概念：
 * 1. 主进程 (Main Process) - 控制中心，运行在 Node.js 中
 * 2. IPC (Inter-Process Communication) - 主进程与渲染进程的通信机制
 * 
 * 包含两种 IPC 模式：
 * - 单向通信：send/on（主进程只监听，不返回值）
 * - 双向通信：invoke/handle（主进程处理并返回结果）
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

/**
 * createWindow() - 创建主窗口
 * 
 * 配置要点：
 * - preload: 加载预加载脚本，建立安全通信桥梁
 * - contextIsolation: true - 隔离上下文，防止页面直接访问 Node.js
 * - nodeIntegration: false - 禁止渲染进程使用 Node.js（安全最佳实践）
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 900, height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,      // 安全：隔离预加载脚本和页面上下文
      nodeIntegration: false       // 安全：禁止渲染进程直接使用 Node.js
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ==================== IPC 单向通信 ====================

/**
 * ipcMain.on(channel, handler) - 监听单向消息
 * 
 * 这是最简单的 IPC 模式：
 * - 渲染进程发送消息 → 主进程接收并处理
 * - 主进程不需要回复（也可以选择性回复，但用 reply 不是必须的）
 * 
 * 适用场景：日志记录、状态通知、事件广播
 */
ipcMain.on('ping', (event, arg) => { //注意这里是 on/send 组合
  // event: 包含 sender（发送者窗口）等信息的事件对象
  // arg: 渲染进程发送的数据（已自动反序列化）
  console.log('【主进程】收到 ping 消息:', arg);
  
  // 单向通信通常不需要回复，这里只是打印到控制台
  // 如果需要回复，用 event.reply('reply-channel', data)（参考 01-intro）
});

// ==================== IPC 双向通信 ====================

/**
 * ipcMain.handle(channel, handler) - 处理需要返回值的请求
 * 
 * 这是推荐的异步请求模式（类似 fetch/axios）：
 * - 渲染进程发送请求 → 主进程处理 → 返回 Promise 结果
 * - 相比 send/on，invoke/handle 更结构化，避免回调嵌套
 * 
 * 适用场景：数据查询、文件操作、系统 API 调用（需要返回值）
 * 
 * --------------------------------------------------------------
 * 什么是 Promise（承诺）？
 * 
 * Promise 是 JavaScript 处理「异步操作」的对象，代表一个
 * "现在还没完成、未来某个时刻才会有结果" 的任务。
 * 
 * 它有三种状态：
 * - pending（进行中）  ：任务还没结束
 * - fulfilled（已成功）：任务完成，拿到结果值（resolve）
 * - rejected（已失败） ：任务出错，拿到错误原因（reject）
 *   状态一旦从 pending 变为成功/失败，就不可再更改。
 * 
 * 为什么需要它？
 *   IPC、文件读写、网络请求等都是耗时操作，不能让程序卡住等待，
 *   于是先返回一个 Promise"占位"，等结果好了再通知调用方。
 * 
 * 如何取结果（两种写法）：
 *   1) .then()/.catch() 链式调用
 *        win.electronAPI.invoke('get-app-path')
 *          .then(path => console.log(path))   // 成功
 *          .catch(err => console.error(err)); // 失败
 *   2) async/await（更直观，像同步代码）
 *        const path = await window.electronAPI.invoke('get-app-path');
 * 
 * 和本文件的关系：
 *   ipcMain.handle 的处理函数返回的普通值（如下面的字符串路径），
 *   Electron 会自动包装成 Promise，渲染进程那边用 invoke 接收时
 *   就能通过 await / .then 拿到这个值。
 * --------------------------------------------------------------
 */
ipcMain.handle('get-app-path', () => { //注意这里是 handle/invoke 组合
  /**
   * app.getPath(name) - 获取 Electron 标准路径
   * 
   * 常用路径名：
   * - 'userData': 应用数据目录（如 ~/Library/Application Support/YourApp/）
   * - 'appData': 所有应用的共享数据目录
   * - 'desktop': 桌面路径
   * - 'downloads': 下载目录
   * - 'temp': 临时文件目录
   * 
   * 这些路径在不同操作系统有不同的实际位置，
   * Electron 会自动根据平台返回正确路径。
   */
  const userDataPath = app.getPath('userData');
  console.log('【主进程】userData 路径:', userDataPath);
  return userDataPath;  // 返回值会被自动序列化，通过 Promise 传递给渲染进程
});
