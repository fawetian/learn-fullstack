/**
 * 05-architecture - Electron 架构详解（文件管理器示例）
 * 
 * 本文件演示完整的 Electron 架构流程：
 * 1. 主进程创建窗口
 * 2. 用户点击"选择文件" → 渲染进程通过 Preload 发送 IPC 请求
 * 3. 主进程调用 Electron 原生对话框 (dialog.showOpenDialog)
 * 4. 用户选择文件后，主进程调用 Node.js fs 读取文件内容
 * 5. 结果通过 IPC 返回给渲染进程，显示在页面上
 * 
 * 关键安全设计：渲染进程不直接访问 fs 或 dialog，
 * 所有文件操作都通过主进程代理，Preload 只暴露最小 API。
 */

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs').promises;  // 使用 fs.promises 获取 Promise 版本的 API
const path = require('path');

let mainWindow;  // 保存窗口引用，供 IPC 处理函数使用

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000, height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true   // 安全：隔离页面和预加载脚本上下文
    }
  });
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ==================== IPC: 读取文件内容 ====================

/**
 * ipcMain.handle('read-file', ...) - 读取指定文件的内容
 * 
 * 参数：
 * - event: IPC 事件对象（包含 sender 等信息）
 * - filePath: 渲染进程传入的文件路径（绝对路径）
 * 
 * 返回值：
 * - { success: true, content: string } 读取成功
 * - { success: false, error: string } 读取失败
 * 
 * 注意：这里使用 fs.promises.readFile() 是异步操作，
 * ipcMain.handle 的 handler 可以返回 Promise，Electron 会自动处理。
 */
ipcMain.handle('read-file', async (event, filePath) => {
  try {
    // fs.readFile(path, encoding) 读取文件为 UTF-8 字符串
    const content = await fs.readFile(filePath, 'utf-8');
    console.log('【主进程】读取文件成功:', filePath);
    return { success: true, content };
  } catch (error) {
    console.error('【主进程】读取文件失败:', error.message);
    return { success: false, error: error.message };
  }
});

// ==================== IPC: 打开文件选择对话框 ====================

/**
 * ipcMain.handle('select-file', ...) - 打开系统文件选择对话框
 * 
 * dialog.showOpenDialog(browserWindow, options) 参数：
 * - browserWindow: 父窗口（对话框会居中显示在该窗口上）
 * - options.properties: 对话框行为选项
 *   - 'openFile': 允许选择文件（而非文件夹）
 *   - 'multiSelections': 允许多选（本示例未启用）
 * - options.filters: 文件类型过滤器
 *   - 用户只能看到指定扩展名的文件，减少误选
 * 
 * 返回值：
 * - { canceled: false, filePaths: ['/path/to/file'] } 用户选择了文件
 * - { canceled: true, filePaths: [] } 用户取消了对话框
 */
ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],  // 只选择文件，不选择文件夹
    filters: [
      { 
        name: '文本文件',  // 过滤器显示名称
        extensions: ['txt', 'md', 'js', 'html', 'css']  // 允许的扩展名
      }
    ]
  });
  
  console.log('【主进程】文件选择结果:', result);
  return result;
});
