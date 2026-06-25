/**
 * 06-windows - Electron 窗口管理演示
 * 
 * 本文件演示以下窗口管理功能：
 * 1. 启动画面 (Splash Screen) - 无边框透明窗口，加载过渡
 * 2. 延迟显示主窗口 - 避免白屏，等页面 ready 后再 show
 * 3. 父子窗口 - 模态子窗口（modal: true, parent: mainWindow）
 * 4. IPC 控制窗口 - 渲染进程通过消息请求主进程打开子窗口
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// 保存窗口引用，防止被垃圾回收，同时供 IPC 处理使用
let mainWindow = null;    // 主窗口
let splash = null;        // 启动画面窗口
let childWindow = null;   // 子窗口（模态对话框）

// ==================== 启动画面 ====================

/**
 * createSplash() - 创建启动画面窗口
 * 
 * 启动画面的设计要点：
 * - frame: false - 去掉系统标题栏和边框，更美观
 * - transparent: true - 透明背景，可实现圆角/毛玻璃效果
 * - alwaysOnTop: true - 保持在最上层，不被其他窗口遮挡
 * - 尺寸小（400x300），只显示 Logo 和加载提示
 * 
 * 适用场景：主窗口加载资源较多时，避免用户看到空白窗口。
 */
function createSplash() {
  splash = new BrowserWindow({
    width: 400, height: 300,
    frame: false,          // 无系统边框
    transparent: true,     // 透明背景
    alwaysOnTop: true,     // 置顶
    // 注意：启动画面不需要 webPreferences/preload，
    // 因为它只显示静态内容，不需要和主进程交互
  });
  splash.loadFile('splash.html');
}

// ==================== 主窗口 ====================

/**
 * createMainWindow() - 创建应用主窗口
 * 
 * 关键设计：show: false
 * - 先创建窗口但不显示（避免用户看到未加载完成的空白页面）
 * - 等页面加载完成（ready-to-show 事件）后再显示
 * - 同时关闭启动画面，实现平滑过渡
 */
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200, height: 800,
    show: false,  // 初始隐藏，避免白屏！这是最佳实践
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  
  mainWindow.loadFile('index.html');
  
  /**
   * win.once('ready-to-show') - 页面加载完成事件
   * 
   * 当窗口内容第一次可以安全显示时触发（DOM 已加载，资源已就绪）。
   * 使用 .once() 而不是 .on()，因为这个事件只触发一次。
   * 
   * 在此事件中：
   * 1. 关闭启动画面 splash
   * 2. 显示主窗口 mainWindow.show()
   * 实现从"加载中"到"主界面"的平滑过渡
   */
  mainWindow.once('ready-to-show', () => {
    if (splash) {
      splash.close();      // 关闭启动画面
      splash = null;       // 释放引用，允许垃圾回收
    }
    mainWindow.show();       // 显示主窗口
  });
  
  // 窗口关闭时清理引用，防止内存泄漏
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ==================== 子窗口 ====================

/**
 * createChildWindow() - 创建模态子窗口
 * 
 * 父子窗口参数：
 * - parent: mainWindow - 指定父窗口，子窗口会跟随父窗口移动/最小化
 * - modal: true - 模态窗口，阻止用户与父窗口交互（必须关闭子窗口才能操作父窗口）
 * 
 * 适用场景：对话框、确认框、设置面板等需要用户聚焦的交互。
 */
function createChildWindow() {
  childWindow = new BrowserWindow({
    parent: mainWindow,    // 父窗口：跟随主窗口移动
    modal: true,          // 模态：阻止操作父窗口
    width: 400, height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  
  childWindow.loadFile('child.html');
  
  // 子窗口关闭时清理引用
  childWindow.on('closed', () => {
    childWindow = null;
  });
}

// ==================== 应用生命周期 ====================

/**
 * IPC: 打开子窗口
 * 
 * 渲染进程通过 preload 暴露的 API 发送 'open-child' 消息，
 * 主进程监听此消息并创建子窗口。
 * 
 * 安全检查：检查 childWindow 是否已存在，避免重复创建。
 */
ipcMain.on('open-child', () => {
  if (!childWindow) {
    createChildWindow();
  }
});

/**
 * IPC: 获取应用信息
 * 
 * 演示 invoke/handle 模式：渲染进程请求，主进程返回数据。
 * app.getName() 和 app.getVersion() 获取应用元信息。
 */
ipcMain.handle('get-app-info', () => ({
  name: app.getName(),
  version: app.getVersion()
}));

/**
 * app.on('ready') - 应用启动
 * 
 * 先显示启动画面，延迟 1.5 秒后创建主窗口。
 * 这个延迟模拟真实应用的加载时间（如加载配置、初始化数据库等）。
 */
app.on('ready', () => {
  createSplash();
  setTimeout(() => {
    createMainWindow();
  }, 3000);  // 1.5 秒延迟，让用户看到"加载中"
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
