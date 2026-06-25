/**
 * 15-advanced - Electron 高级应用
 * 
 * 本文件演示 Electron 的高级功能：
 * 1. 自定义协议（Custom Protocol）- 注册 myapp:// 协议
 * 2. 窗口状态管理 - 保存和恢复窗口大小/位置
 * 3. 多窗口广播 - 向所有窗口发送消息
 * 4. 自动更新介绍 - electron-updater 的使用
 * 
 * 自定义协议注册流程：
 * 1. app.setAsDefaultProtocolClient('myapp') - 注册为系统协议处理程序
 * 2. 监听 app.on('open-url') / 'second-instance' - 处理协议 URL
 * 3. 解析 URL 参数，执行对应操作
 * 
 * 注意：自定义协议需要在打包安装后才生效，开发时无法直接测试。
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// 窗口状态文件路径
const stateFile = path.join(__dirname, 'window-state.json');

// 读取窗口状态
function loadWindowState() {
  try {
    if (fs.existsSync(stateFile)) {
      return JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
    }
  } catch(e) {
    console.log('窗口状态读取失败，使用默认状态');
  }
  return { width: 900, height: 600, x: undefined, y: undefined };
}

// 保存窗口状态
function saveWindowState(win) {
  const bounds = win.getBounds();  // 获取窗口位置和大小 {x, y, width, height}
  fs.writeFileSync(stateFile, JSON.stringify(bounds));
  console.log('窗口状态已保存:', bounds);
}

function createWindow() {
  const state = loadWindowState();
  const win = new BrowserWindow({
    width: state.width, height: state.height,
    x: state.x, y: state.y,  // 恢复位置
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.loadFile('index.html');
  
  // 窗口关闭时保存状态
  win.on('close', () => saveWindowState(win));
  return win;
}

// ==================== 自定义协议注册 ====================

/**
 * 注册自定义协议 myapp://
 * 
 * app.setAsDefaultProtocolClient(protocol, execPath, args)
 * - protocol: 协议名，如 'myapp'
 * - execPath: 可执行文件路径（默认当前应用）
 * - args: 传递给应用的参数
 * 
 * 注册后，系统会将 myapp:// 开头的 URL 交给本应用处理。
 * 这在网页中点击链接打开应用时非常有用。
 */
app.setAsDefaultProtocolClient('myapp');

app.whenReady().then(() => {
  createWindow();
  
  // 自动更新检查（需要配置更新服务器）
  // const { autoUpdater } = require('electron-updater');
  // autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// macOS: 通过协议打开应用时触发
app.on('open-url', (event, url) => {
  console.log('【协议】通过 open-url 收到:', url);
  // 解析协议 URL，执行对应操作
  // 例如：myapp://open/file/path -> 打开文件
});

// Windows/Linux: 通过协议打开应用时（单实例模式）
app.on('second-instance', (event, argv) => {
  console.log('【协议】通过 second-instance 收到参数:', argv);
  // argv 中包含 myapp:// 开头的 URL
});

// ==================== IPC: 广播通信 ====================

/**
 * IPC: broadcast - 向所有窗口广播消息
 * 
 * BrowserWindow.getAllWindows() 获取所有窗口
 * webContents.send(channel, data) 向指定窗口发送消息
 * 
 * 这是多窗口间通信的核心机制：主进程作为消息总线，
 * 接收一个窗口的消息，转发给所有其他窗口。
 */
ipcMain.handle('broadcast', (event, message) => {
  const allWindows = BrowserWindow.getAllWindows();
  allWindows.forEach(win => {
    if (win.webContents !== event.sender) {  // 不发回发送者
      win.webContents.send('broadcast-message', message);
    }
  });
  return '广播已发送给 ' + (allWindows.length - 1) + ' 个窗口';
});

// IPC: 打开新窗口（用于演示多窗口广播）
ipcMain.handle('create-window', () => {
  const win = createWindow();
  return '新窗口已创建，ID: ' + win.id;
});

ipcMain.handle('get-protocol-url', () => {
  // 返回最后收到的协议 URL（简化示例）
  return 'myapp://example';
});
