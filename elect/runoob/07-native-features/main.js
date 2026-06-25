/**
 * 07-native-features - Electron 原生功能演示
 * 
 * 本文件演示 Electron 访问操作系统原生功能的完整能力：
 * 1. 应用菜单 (Menu) - 窗口顶部的菜单栏
 * 2. 系统托盘 (Tray) - 任务栏/菜单栏图标和右键菜单
 * 3. 对话框 (Dialog) - 文件选择、消息提示、错误框
 * 4. 通知 (Notification) - 系统级原生通知（类似微信消息弹窗）
 * 5. 全局快捷键 (GlobalShortcut) - 注册系统级热键（即使窗口未聚焦也生效）
 * 
 * 所有原生功能都在主进程中调用，渲染进程通过 IPC 请求。
 */

const { app, BrowserWindow, Menu, Tray, dialog, Notification, globalShortcut, ipcMain } = require('electron');
const path = require('path');

let mainWindow;  // 主窗口引用
let tray;        // 托盘图标引用

/**
 * createWindow() - 创建主窗口
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  mainWindow.loadFile('index.html');
  
  // 页面加载完成后再显示（避免白屏）
  mainWindow.once('ready-to-show', () => mainWindow.show());
}

// ==================== 可复用的原生功能函数 ====================
// 把核心原生功能提取成函数，这样"应用菜单"和"页面按钮"可以共用同一份逻辑。

/** 显示系统通知（右上角弹窗） */
function showNotification() {
  // Notification.isSupported() 检测当前系统是否支持通知
  if (!Notification.isSupported()) {
    console.log('【通知】当前系统不支持通知');
    return;
  }

  const n = new Notification({
    title: 'Electron 原生功能',   // 通知标题
    body: '这是系统通知演示！'     // 通知正文
  });

  // 监听通知事件，方便确认是否真的弹出 / 被点击
  n.on('show', () => console.log('【通知】已触发 show（若没看到弹窗，多半是系统通知权限被关闭）'));
  n.on('click', () => console.log('【通知】被点击'));
  n.on('failed', (e, err) => console.log('【通知】失败：', err));

  n.show();
  console.log('【通知】已调用 show()');
}

/** 显示"关于"信息对话框 */
function showAbout() {
  dialog.showMessageBox({
    type: 'info',
    title: '关于',
    message: '原生功能演示 v1.0.0'
  });
}

/** 打开文件选择对话框，并把选中的路径发回渲染进程 */
async function openFileDialog() {
  const result = await dialog.showOpenDialog({
    properties: ['openFile']  // 只选择文件
  });
  if (!result.canceled && result.filePaths.length > 0) {
    // 将文件路径通过 IPC 发送给渲染进程
    mainWindow.webContents.send('file-opened', result.filePaths[0]);
  }
}

// ==================== 1. 应用菜单 (Menu) ====================

/**
 * createMenu() - 构建并设置应用菜单
 * 
 * Menu.buildFromTemplate(template) 参数说明：
 * - label: 菜单项显示的文本
 * - submenu: 子菜单数组
 * - role: 系统预定义行为（如 'quit', 'copy', 'paste'）
 *   - 'quit': 退出应用（自动调用 app.quit()）
 *   - 'copy'/'paste': 剪贴板操作
 * - click: 点击时的回调函数
 * - accelerator: 快捷键（如 'CmdOrCtrl+S'）
 *   - 'CmdOrCtrl' 自动适配 macOS(Command) / Windows/Linux(Control)
 * - type: 'separator' 表示分隔线
 * 
 * 菜单会自动适配平台：
 * - macOS: 菜单在屏幕顶部菜单栏
 * - Windows/Linux: 菜单在窗口标题栏下方
 */
function createMenu() {
  const template = [
    {
      label: '文件',  // 一级菜单
      submenu: [
        { label: '显示通知', click: showNotification },  // 复用上面的函数
        { label: '关于', click: showAbout },
        { type: 'separator' },  // 菜单分隔线
        { label: '退出', role: 'quit' }  // role: 'quit' 自动退出应用
      ]
    },
    {
      label: '工具',
      submenu: [
        { label: '打开文件', click: openFileDialog }  // 复用上面的函数（与页面按钮同名）
      ]
    }
  ];
  
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);  // 设置为应用菜单
}

// ==================== 2. 系统托盘 (Tray) ====================

/**
 * createTray() - 创建系统托盘图标
 * 
 * Tray 图标显示在：
 * - macOS: 菜单栏顶部（和 Wi-Fi、电池图标在一起）
 * - Windows: 任务栏右下角系统托盘区域
 * - Linux: 系统托盘区域
 * 
 * 右键托盘图标会显示 contextMenu（上下文菜单）。
 * 托盘让应用在后台运行，用户可以通过托盘快速访问。
 */
function createTray() {
  // 创建托盘图标（需要 PNG 文件，建议 16x16 或 32x32）
  tray = new Tray(path.join(__dirname, 'tray-icon.png'));
  
  // 构建托盘右键菜单
  const contextMenu = Menu.buildFromTemplate([
    { label: '显示窗口', click: () => mainWindow.show() },  // 显示隐藏的主窗口
    { label: '退出', click: () => app.quit() }             // 退出应用
  ]);
  
  tray.setToolTip('Electron 原生功能演示');  // 鼠标悬停提示文字
  tray.setContextMenu(contextMenu);             // 设置右键菜单
}

// ==================== 3. 全局快捷键 (GlobalShortcut) ====================

/**
 * registerShortcuts() - 注册系统级全局快捷键
 * 
 * globalShortcut.register(accelerator, callback):
 * - accelerator: 快捷键组合，如 'CmdOrCtrl+Shift+I'
 *   - 'CmdOrCtrl': macOS 用 Command，Win/Linux 用 Control
 *   - 'Shift', 'Alt': 修饰键
 * - callback: 按下快捷键时执行的函数
 * 
 * 全局快捷键 vs 应用快捷键：
 * - 全局快捷键：即使应用窗口没有焦点，也能触发（如 QQ 截图快捷键）
 * - 应用快捷键：只在窗口有焦点时触发（如编辑器保存快捷键）
 * 
 * 注意：全局快捷键是系统级资源，应用退出时应释放（unregisterAll）。
 */
function registerShortcuts() {
  globalShortcut.register('CmdOrCtrl+Shift+I', () => {
    // 打开开发者工具（DevTools），用于调试渲染进程
    console.log('【快捷键】打开开发者工具');
    mainWindow.webContents.openDevTools();
  });
}

// ==================== 4. IPC 处理 ====================

/**
 * IPC: 页面请求显示对话框
 * 
 * 渲染进程点击按钮 → 发送 IPC → 主进程显示对话框
 * 这是典型的"渲染进程触发 UI，主进程执行系统操作"模式。
 */
ipcMain.handle('show-dialog', async () => {
  const result = await dialog.showMessageBox({
    type: 'info',
    title: '来自主进程',
    message: '这是主进程显示的对话框！'
  });
  return result.response;  // 返回用户点击的按钮索引
});

// IPC: 页面请求显示系统通知（等价于菜单"文件 → 显示通知"）
ipcMain.handle('show-notification', () => showNotification());

// IPC: 页面请求显示"关于"对话框（等价于菜单"文件 → 关于"）
ipcMain.handle('show-about', () => showAbout());

// IPC: 页面请求打开文件对话框（等价于菜单"工具 → 打开对话框"）
ipcMain.handle('open-file', () => openFileDialog());

// ==================== 应用生命周期 ====================

// 设置应用名：macOS 通知会以此名字显示，并据此在「系统设置 → 通知」中归类权限
app.setName('Electron 原生功能演示');

app.whenReady().then(() => {
  createWindow();
  createMenu();           // 创建应用菜单
  createTray();           // 创建托盘图标
  registerShortcuts();    // 注册全局快捷键
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

/**
 * app.on('will-quit') - 应用即将退出
 * 
 * 在应用退出前释放全局快捷键，避免快捷键残留影响其他应用。
 * 这是全局快捷键的清理最佳实践。
 */
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
