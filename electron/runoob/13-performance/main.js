/**
 * 13-performance - Electron 性能优化演示
 * 
 * 本文件演示性能优化技术：
 * 1. 延迟显示 (show: false) - 避免用户看到未加载完成的空白页面
 * 2. 单实例锁 (single instance lock) - 防止应用多开，节省资源
 * 3. 后台节流 (backgroundThrottling) - 后台时保持性能
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

// ==================== 单实例锁 ====================

/**
 * app.requestSingleInstanceLock() - 请求单实例锁
 * 
 * 如果应用已经在运行，返回 false，此时应该退出。
 * 这样可以防止用户多次点击应用图标导致多开。
 * 
 * 多开的问题：
 * - 浪费内存和 CPU
 * - 可能导致数据冲突（如多个实例写入同一个文件）
 * - 用户体验不一致（不同实例状态不同）
 */
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  console.log('应用已在运行，退出当前实例');
  app.quit();  // 退出当前实例，保持之前运行的实例
}

function createWindow() {
  const win = new BrowserWindow({
    width: 900, height: 600,
    show: false,  // 关键：初始隐藏，等页面 ready 后再显示，避免白屏
    
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      
      // backgroundThrottling: false
      // 当窗口在后台时，是否降低渲染进程的优先级。
      // false 表示保持性能，适用于需要后台持续运行的应用（如实时数据）。
      backgroundThrottling: false
    }
  });
  
  win.loadFile('index.html');
  
  // 页面加载完成后再显示
  win.once('ready-to-show', () => win.show());
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
