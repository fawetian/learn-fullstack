/**
 * 19-vue-electron - 主进程：Vue 与 Electron 集成
 * 
 * 本文件是 Vue + Electron 集成的主进程入口：
 * 1. 加载 Vue 开发服务器（开发模式）或打包文件（生产模式）
 * 2. 提供 IPC 处理：ping-pong、选择文件、通知等
 * 3. 路径处理：__dirname 在 Vue CLI 下指向 dist_electron，需要调整
 * 
 * Vue CLI Plugin Electron Builder 的工作方式：
 * - 开发时：启动 Vue 开发服务器，Electron 加载 localhost:8080
 * - 生产时：Vue 打包到 dist，Electron 打包为可执行文件
 */

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 800,
    webPreferences: {
      // 在 Vue CLI Electron Builder 中，preload 路径需要相对于 electron 入口
      // 开发时和打包时的路径不同，需要动态计算
      preload: path.join(__dirname, '../../preload.js'),
      contextIsolation: true
    }
  });
  
  if (isDev) {
    // Vue CLI 默认开发服务器端口是 8080
    win.loadURL('http://localhost:8080');
    win.webContents.openDevTools();
  } else {
    // 生产模式：加载 Vue 打包文件
    // Vue CLI Electron Builder 默认输出到 dist_electron/bundled
    win.loadFile(path.join(__dirname, '../index.html'));
  }
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// ==================== IPC 处理 ====================

ipcMain.handle('vue-ping', () => 'pong from Electron');

ipcMain.handle('vue-open-file', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'] });
  return result.canceled ? null : result.filePaths[0];
});
