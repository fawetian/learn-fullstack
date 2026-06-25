/**
 * 10-file-system - Electron 文件系统操作演示
 * 
 * 本文件演示 Electron 中的文件系统操作：
 * 1. 读取目录内容（fs.readdirSync）
 * 2. 读取文件内容（fs.readFileSync）
 * 3. 写入文件内容（fs.writeFileSync）
 * 4. 选择目录（dialog.showOpenDialog with openDirectory）
 * 
 * 安全要点：
 * - 所有文件操作在主进程执行，渲染进程无法直接访问 fs
 * - 通过 IPC 请求，主进程可以验证和限制路径
 * - 错误处理：捕获异常并返回错误信息，避免崩溃
 */

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');  // Node.js 内置文件系统模块
const path = require('path');

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// ==================== IPC: 读取目录 ====================

/**
 * IPC: read-dir - 读取指定目录的内容列表
 * 
 * fs.readdirSync(dirPath) 同步读取目录，返回文件名数组。
 * 如果目录不存在或权限不足，抛出异常被 catch 捕获。
 */
ipcMain.handle('read-dir', (event, dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);  // 同步读取目录
    console.log('【文件系统】读取目录:', dirPath, '文件数:', files.length);
    return files;  // 返回文件名数组
  } catch (e) {
    console.error('【文件系统】读取目录失败:', e.message);
    return { error: e.message };
  }
});

// ==================== IPC: 读取文件 ====================

/**
 * IPC: read-file - 读取指定文件的内容
 * 
 * fs.readFileSync(filePath, 'utf-8') 同步读取文件为 UTF-8 字符串。
 */
ipcMain.handle('read-file', (event, filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return { content };
  } catch (e) {
    return { error: e.message };
  }
});

// ==================== IPC: 写入文件 ====================

/**
 * IPC: write-file - 写入内容到指定文件
 * 
 * fs.writeFileSync(filePath, content) 同步写入文件。
 * 如果文件不存在则创建，存在则覆盖。
 * 注意：这是一个危险操作，主进程应验证路径防止写入系统文件。
 */
ipcMain.handle('write-file', (event, filePath, content) => {
  try {
    fs.writeFileSync(filePath, content);  // 同步写入文件
    console.log('【文件系统】写入文件:', filePath);
    return { success: true };
  } catch (e) {
    return { error: e.message };
  }
});

// ==================== IPC: 选择目录 ====================

/**
 * IPC: select-dir - 打开目录选择对话框
 * 
 * dialog.showOpenDialog({ properties: ['openDirectory'] })
 * 只允许选择目录，不选择文件。
 * 返回选择的目录路径。
 */
ipcMain.handle('select-dir', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']  // 只选择目录
  });
  console.log('【文件系统】选择目录:', result);
  return result;
});
