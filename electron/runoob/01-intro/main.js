/**
 * 01-intro - Electron 主进程入口文件
 * 
 * 主进程 (Main Process) 是 Electron 应用的入口和控制中心：
 * - 每个 Electron 应用有且只有一个主进程
 * - 运行在 Node.js 环境中
 * - 负责创建和管理窗口、处理系统事件、执行 IPC 通信
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

/**
 * createWindow() - 创建主窗口
 * 
 * BrowserWindow 是 Electron 的核心类，用于创建和管理应用窗口。
 * 每个 BrowserWindow 会启动一个独立的渲染进程（Chromium 实例）。
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 900,           // 窗口宽度（像素）
    height: 600,          // 窗口高度（像素）
    webPreferences: {
      // preload: 指定预加载脚本路径
      // 预加载脚本在页面加载前执行，可以安全地访问 Node.js API
      // 同时通过 contextBridge 暴露受限 API 给渲染进程
      preload: path.join(__dirname, 'preload.js'),
      
      // contextIsolation: true 是安全最佳实践
      // 它把预加载脚本的上下文和页面 JS 隔离，防止页面恶意代码访问 Node.js
      contextIsolation: true,
      
      // nodeIntegration: false 禁止渲染进程直接访问 Node.js
      // 所有系统操作都通过主进程 + IPC 完成，避免 XSS 导致系统级攻击
      nodeIntegration: false
    }
  });

  // 加载本地 HTML 文件到窗口中
  // __dirname 是 Node.js 内置变量，表示当前文件所在目录
  win.loadFile('index.html');
  
  // 可选：打开开发者工具（调试时使用）
  // win.webContents.openDevTools();
}

/**
 * app.whenReady() - Electron 初始化完成事件
 * 
 * 当 Electron 完成初始化（创建完 Chromium 和 Node.js 环境）后触发。
 * 类似于 DOM 的 DOMContentLoaded，是创建窗口的最佳时机。
 * 返回 Promise，可以用 .then() 链式调用。
 */
app.whenReady().then(() => {
  createWindow();
});

/**
 * app.on('window-all-closed') - 所有窗口关闭事件
 * 
 * 当所有 BrowserWindow 都被关闭时触发。
 * macOS 惯例：关闭所有窗口时应用保持后台运行（不退出），
 * 所以只在非 macOS 平台（Windows/Linux）时调用 app.quit()。
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();  // 完全退出应用，结束主进程
  }
});

/**
 * IPC 通信 - 监听来自渲染进程的 'ping' 消息
 * 
 * ipcMain.on(channel, handler) 在主进程中注册事件监听器：
 * - channel: 通信通道名称，渲染进程通过相同名称发送消息
 * - handler: 回调函数，event 包含发送者信息，data 是传递的数据
 * 
 * event.reply() 用于向发送者回复消息，这是双向通信的写法。
 */
ipcMain.on('ping', (event, data) => {
  // 在终端输出接收到的数据，方便观察 IPC 流程
  console.log('【主进程】收到 ping 消息:', data);
  
  // 向发送者回复 'pong' 消息，附带处理结果
  // 渲染进程需要通过 ipcRenderer.on('pong', ...) 监听此回复
  event.reply('pong', { 
    reply: 'ok',           // 自定义状态字段
    received: data         // 把收到的数据回传，方便验证
  });
});
