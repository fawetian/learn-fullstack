/**
 * 18-react-electron - 主进程：React 与 Electron 集成
 * 
 * 本文件是 React + Electron 集成的主进程入口：
 * 1. 开发模式：加载 React 开发服务器（http://localhost:3000）
 * 2. 生产模式：加载打包后的 React 文件（../build/index.html）
 * 3. 提供 IPC 处理：ping-pong、通知、打开文件等
 * 
 * 检测开发模式的方法：
 * - isDev = !app.isPackaged（未打包时认为是开发）
 * - 或者检查 NODE_ENV === 'development'
 * 
 * 开发模式优势：React 热更新（Hot Reload）直接生效，无需重启 Electron。
 */

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;  // 是否开发模式：未打包 = 开发

function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 800,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload.js'),  // preload.js 在 public 同级目录
      contextIsolation: true
    }
  });
  
  if (isDev) {
    // 开发模式：加载 React 开发服务器
    // 需要确保 React 开发服务器已启动（npm start 同时启动）
    win.loadURL('http://localhost:3000');
    
    // 开发时自动打开 DevTools
    win.webContents.openDevTools();
  } else {
    // 生产模式：加载打包后的 React 文件
    // build/index.html 是 create-react-app 的默认输出
    win.loadFile(path.join(__dirname, '..', 'build', 'index.html'));
  }
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// ==================== IPC 处理 ====================

ipcMain.handle('react-ping', () => 'pong from Electron');

ipcMain.handle('react-open-file', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'] });
  return result.canceled ? null : result.filePaths[0];
});
