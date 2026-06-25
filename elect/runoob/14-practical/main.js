/**
 * 14-practical - Electron 综合实战项目
 * 
 * 本文件是一个综合实战项目，展示多个 Electron 功能的组合使用：
 * 1. 多窗口管理：创建多个 BrowserWindow，管理窗口数组
 * 2. 系统菜单：应用菜单（Menu.buildFromTemplate）
 * 3. 系统托盘：Tray 图标和右键菜单
 * 4. 文件操作：dialog.showOpenDialog + fs.readFileSync
 * 5. 通知：Notification.show()
 * 6. Shell 操作：打开外部链接、在文件夹中显示文件
 * 7. IPC 多通道：不同操作使用不同 IPC 通道
 * 
 * 学习要点：
 * - 多窗口管理中需要维护窗口数组，监听 closed 事件清理
 * - 系统托盘退出时需要先清理托盘图标
 * - 通知需要 requestPermissions（Windows/macOS 已默认允许）
 */

const { app, BrowserWindow, ipcMain, dialog, Menu, Tray, Notification, shell } = require('electron');
const path = require('path');
const fs = require('fs');

// 窗口数组：管理所有打开的窗口
let windows = [];
let tray = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 900, height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.loadFile('index.html');
  
  // 窗口关闭时从数组中移除
  win.on('closed', () => {
    windows = windows.filter(w => w !== win);
  });
  windows.push(win);
  return win;
}

// 创建系统菜单
function createMenu() {
  const template = [
    {
      label: '文件',
      submenu: [
        { label: '新建窗口', click: () => createWindow() },
        { label: '退出', role: 'quit' }  // role: 'quit' 使用内置退出行为
      ]
    },
    {
      label: '帮助',
      submenu: [
        { label: '关于', click: () => dialog.showMessageBox({ message: 'Electron 实战项目' }) }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);  // 从模板构建菜单
  Menu.setApplicationMenu(menu);  // 设置为应用菜单
}

// 创建系统托盘
function createTray() {
  // 在 macOS 上， tray 图标尺寸最好是 16x16 或 32x32
  // 这里用 emoji 作为简单图标
  tray = new Tray(path.join(__dirname, 'assets', 'icon.png').replace('icon.png', 'assets'));
  
  // 托盘右键菜单
  const contextMenu = Menu.buildFromTemplate([
    { label: '显示应用', click: () => BrowserWindow.getAllWindows().forEach(w => w.show()) },
    { label: '退出', click: () => app.quit() }
  ]);
  tray.setToolTip('Electron 实战');
  tray.setContextMenu(contextMenu);
  
  // 点击托盘图标显示主窗口
  tray.on('click', () => {
    const win = windows[0];
    if (win) { win.show(); win.focus(); }
  });
}

app.whenReady().then(() => {
  createWindow();
  createMenu();
  // 注意：托盘需要图标文件，这里先注释掉，如果 assets 目录有图标可以取消注释
  // createTray();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// ==================== IPC: 多窗口操作 ====================

ipcMain.handle('create-new-window', () => {
  const newWin = createWindow();
  return '新窗口已创建，ID: ' + newWin.id;
});

// ==================== IPC: 文件操作 ====================

ipcMain.handle('select-and-read-file', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'] });
  if (result.canceled) return { canceled: true };
  const filePath = result.filePaths[0];
  const content = fs.readFileSync(filePath, 'utf-8');
  return { filePath, content };
});

// ==================== IPC: 通知 ====================

ipcMain.handle('show-notification', (event, title, body) => {
  // 检查通知权限（macOS 上需要用户授权）
  // Windows 和 Linux 通常直接允许
  if (Notification.isSupported()) {
    const notification = new Notification({ title, body });
    notification.show();
    return true;
  }
  return false;
});

// ==================== IPC: Shell 操作 ====================

ipcMain.handle('open-external', (event, url) => {
  // shell.openExternal 在安全的浏览器中打开外部链接
  // 注意：用户可能输入恶意链接，应该验证 URL 格式
  shell.openExternal(url);
  return true;
});

ipcMain.handle('show-in-folder', (event, filePath) => {
  // shell.showItemInFolder 在文件管理器中显示文件并选中
  shell.showItemInFolder(filePath);
  return true;
});
