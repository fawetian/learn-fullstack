/**
 * 08-apis - Electron 常用 API 演示
 * 
 * 本文件是 Electron 常用 API 的交互式演示，
 * 渲染进程通过按钮触发，主进程调用实际 API 并返回结果。
 * 
 * 涵盖三大模块：
 * 1. Dialog - 系统对话框（文件选择、保存、消息）
 * 2. Clipboard - 剪贴板操作（读写文本）
 * 3. Shell - 系统外壳（打开外部链接/文件）
 */

const { app, BrowserWindow, ipcMain, dialog, clipboard, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000, height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// ==================== 1. Dialog API ====================

/**
 * dialog.showOpenDialog() - 打开文件选择对话框
 * 
 * 让用户选择一个或多个文件，返回文件路径。
 * 这是 Electron 应用中最常用的对话框之一。
 */
ipcMain.handle('show-open-dialog', () => {
  return dialog.showOpenDialog({
    properties: ['openFile']  // 只选择文件，不选文件夹
  });
});

/**
 * dialog.showSaveDialog() - 打开保存文件对话框
 * 
 * 让用户指定保存位置和文件名，返回文件路径。
 * 即使文件不存在也会返回路径，实际写入需要手动调用 fs。
 */
ipcMain.handle('show-save-dialog', () => {
  return dialog.showSaveDialog({
    defaultPath: 'test.txt'  // 默认文件名
  });
});

/**
 * dialog.showMessageBox() - 显示消息对话框
 * 
 * 类型：'info'（信息）, 'error'（错误）, 'warning'（警告）, 'question'（询问）
 * 返回用户点击的按钮索引。
 */
ipcMain.handle('show-message-box', () => {
  return dialog.showMessageBox({
    type: 'info',
    title: 'API 演示',
    message: '这是一个消息对话框！'
  });
});

// ==================== 2. Clipboard API ====================

/**
 * clipboard.readText() - 读取系统剪贴板中的文本
 * 
 * 可以读取任何应用复制的内容（不限于本应用）。
 * 注意：剪贴板 API 只能在主进程中调用，渲染进程通过 IPC 获取。
 */
ipcMain.handle('get-clipboard', () => {
  return clipboard.readText();
});

/**
 * clipboard.writeText(text) - 将文本写入系统剪贴板
 * 
 * 写入后，其他应用（如微信、浏览器）可以直接粘贴此内容。
 */
ipcMain.handle('set-clipboard', (event, text) => {
  clipboard.writeText(text);
  return '已写入: ' + text;
});

// ==================== 3. Shell API ====================

/**
 * shell.openExternal(url) - 用系统默认应用打开 URL
 * 
 * 例如打开 https://www.electronjs.org 会用系统默认浏览器。
 * 也可以打开文件路径（如 shell.openExternal('file:///path/to/file.pdf')）。
 */
ipcMain.handle('open-external', (event, url) => {
  shell.openExternal(url);
  return '已打开: ' + url;
});
