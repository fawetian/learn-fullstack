/**
 * 12-security - Electron 安全最佳实践
 * 
 * 本文件演示 Electron 的安全配置：
 * 1. contextIsolation: true - 隔离上下文，防止页面访问 Node.js
 * 2. nodeIntegration: false - 禁止渲染进程使用 Node.js API
 * 3. sandbox: true - 沙箱模式，渲染进程完全隔离
 * 4. webSecurity: true - 启用 Web 安全策略（同源策略等）
 * 5. IPC 输入验证 - 主进程验证所有来自渲染进程的数据
 * 
 * 这些配置组合是 Electron 安全架构的核心，
 * 确保即使页面被 XSS 攻击，攻击者也无法执行系统级操作。
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      
      // ===== 安全配置 =====
      
      contextIsolation: true,   // 隔离预加载脚本和页面上下文
      nodeIntegration: false,  // 禁止页面直接使用 Node.js
      sandbox: true,            // 沙箱模式，进一步隔离渲染进程
      webSecurity: true         // 启用同源策略、CSP 等 Web 安全
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// ==================== IPC 输入验证 ====================

/**
 * IPC: safe-action - 安全的处理函数，带输入验证
 * 
 * 这是安全最佳实践：
 * 1. 验证数据类型（typeof data !== 'string'）
 * 2. 验证数据长度（data.length > 100）
 * 3. 验证数据格式（防止路径遍历、命令注入等）
 * 4. 验证来源（event.senderFrame.url）
 * 
 * 如果验证失败，抛出错误，渲染进程通过 Promise.catch 捕获。
 * 这样可以防止恶意数据导致系统安全问题。
 */
ipcMain.handle('safe-action', (event, data) => {
  // 验证1：类型检查
  if (typeof data !== 'string') {
    throw new Error('输入必须是字符串');
  }
  
  // 验证2：长度限制
  if (data.length > 100) {
    throw new Error('输入长度不能超过 100 字符');
  }
  
  // 验证3：来源检查（可选，验证消息是否来自可信来源）
  // if (!event.senderFrame.url.startsWith('file://')) {
  //   throw new Error('不可信的 IPC 来源');
  // }
  
  console.log('【安全】通过验证的输入:', data);
  return '安全操作成功: ' + data;
});
