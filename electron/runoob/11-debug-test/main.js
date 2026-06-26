/**
 * 11-debug-test - Electron 调试与测试演示
 * 
 * 本文件演示 Electron 的调试配置：
 * 1. 自动打开 DevTools（开发者工具）
 * 2. devTools: true 确保 DevTools 可用（即使在生产环境也能打开）
 * 3. 通过 Preload 暴露进程信息到渲染进程，方便调试时查看环境
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      
      // devTools: true 确保开发者工具可用
      // 即使打包后，用户也可以通过快捷键打开 DevTools
      // 如果要禁止，设为 false（生产环境通常禁止）
      devTools: true
    }
  });
  
  win.loadFile('index.html');
  
  /**
   * win.webContents.openDevTools() - 自动打开开发者工具
   * 
   * 这是调试渲染进程的主要工具：
   * - Console: 查看 console.log 输出
   * - Elements: 查看和修改 DOM
   * - Network: 查看网络请求
   * - Sources: 断点调试 JS 代码
   * 
   * 开发时常用，生产环境通常去掉或只在特定条件下打开。
   */
  win.webContents.openDevTools();
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
