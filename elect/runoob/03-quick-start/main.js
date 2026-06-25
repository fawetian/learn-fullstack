/**
 * 03-quick-start - Electron 快速开始（你的第一个 Electron 应用）
 * 
 * 这是 Electron 应用的最小骨架，包含三个核心步骤：
 * 1. 导入 Electron 模块（app, BrowserWindow）
 * 2. 定义 createWindow() 函数创建窗口
 * 3. 在 app.whenReady() 中调用 createWindow()
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

/**
 * createWindow() - 创建应用的主窗口
 * 
 * BrowserWindow 是 Electron 的核心类，负责创建和管理窗口。
 * 参数 options 是一个对象，控制窗口的各种属性：
 * - width/height: 窗口尺寸（像素）
 * - webPreferences: 控制渲染进程的行为（本示例使用最简配置）
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 800,   // 窗口宽度：800 像素
    height: 600,  // 窗口高度：600 像素
    
    webPreferences: {
      // 本示例是最简版，暂不配置 preload、contextIsolation 等
      // 实际项目中应该配置安全选项（参考 01-intro 或 12-security）
    }
  });

  /**
   * loadFile() - 加载本地 HTML 文件到窗口
   * 
   * 这是 Electron 的两种页面加载方式之一：
   * - loadFile('path'): 加载本地文件，用于开发桌面应用（推荐）
   * - loadURL('https://...'): 加载远程网页，用于将 Web 应用包装为桌面端
   * 
   * 参数路径是相对于当前目录的相对路径，或绝对路径。
   */
  win.loadFile('index.html');
  
  // 可选：打开开发者工具（F12），用于调试渲染进程
  // win.webContents.openDevTools();
}

/**
 * app.whenReady() - Electron 初始化完成
 * 
 * 当 Electron 完成以下初始化后触发：
 * - Chromium 渲染引擎准备就绪
 * - Node.js 运行环境准备就绪
 * - 主进程事件循环启动
 * 
 * 这是一个 Promise，所以用 .then() 链式调用。
 * 也可以用 async/await: await app.whenReady();
 */
app.whenReady().then(() => {
  createWindow();
  
  console.log('Electron 应用已启动！');
  console.log('平台:', process.platform);  // 'darwin' = macOS, 'win32' = Windows, 'linux' = Linux
});

/**
 * app.on('activate') - macOS 特有事件
 * 
 * macOS 的惯例：点击 Dock 图标时应重新创建窗口（如果当前没有窗口）。
 * 这是 macOS 用户习惯，Windows 和 Linux 不需要此处理。
 */
app.on('activate', () => {
  // BrowserWindow.getAllWindows() 返回当前所有窗口的数组
  // 如果数组长度为 0，说明没有打开的窗口，重新创建一个
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * app.on('window-all-closed') - 所有窗口关闭事件
 * 
 * 当所有 BrowserWindow 实例都被关闭时触发。
 * 
 * macOS 特殊处理：
 - macOS 应用通常保持后台运行（即使所有窗口关闭），
 *   所以 process.platform === 'darwin' 时不调用 app.quit()。
 * - Windows/Linux 则直接退出应用。
 */
app.on('window-all-closed', () => {
  // process.platform 返回当前操作系统标识符
  // 'darwin' = macOS, 'win32' = Windows, 'linux' = Linux
  if (process.platform !== 'darwin') {
    app.quit();  // 退出应用，结束主进程
  }
});
