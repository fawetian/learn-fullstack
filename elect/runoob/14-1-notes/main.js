/**
 * 14-1-notes - 项目一：桌面笔记应用（主进程）
 *
 * 本文件实现桌面笔记应用的主进程，核心功能：
 * 1. 窗口管理：创建主窗口，支持多窗口（菜单"新建窗口"）
 * 2. 数据持久化：electron-store 保存笔记数组（JSON 自动序列化）
 * 3. 系统菜单：文件菜单（新建窗口、保存）、编辑菜单（复制粘贴等）
 * 4. IPC：提供 get-notes / save-notes / create-window 三个通道
 *
 * electron-store 要点：
 * - 底层用 JSON 文件存储（位置：app.getPath('userData')/config.json）
 * - 自动序列化/反序列化，无需手动 JSON.stringify/parse
 * - store.get(key, defaultValue) 获取，store.set(key, value) 设置
 * - 支持嵌套对象：store.get('notes') 返回完整数组
 */

const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

// 引入 electron-store：本地数据持久化库
const Store = require('electron-store');
const store = new Store();

// 窗口数组：管理所有打开的笔记窗口
let windows = [];

/**
 * 创建笔记窗口
 * @param {string} noteId - 可选，指定要编辑的笔记 ID（多窗口同时编辑不同笔记）
 */
function createWindow(noteId) {
  const win = new BrowserWindow({
    width: 1000, height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile('index.html');

  // 窗口关闭时从数组移除，防止内存泄漏
  win.on('closed', () => {
    windows = windows.filter(w => w !== win);
  });

  windows.push(win);
  return win;
}

// ==================== 应用菜单 ====================

/**
 * 构建应用菜单（Menu.buildFromTemplate）
 *
 * 菜单结构：
 * - 文件：新建窗口（Ctrl+N）、保存（Ctrl+S）、退出
 * - 编辑：撤销、重做、剪切、复制、粘贴（role 内置角色）
 * - 视图：刷新、DevTools
 *
 * role 是 Electron 内置菜单角色，会自动绑定系统行为：
 * - undo/redo/cut/copy/paste：编辑操作
 * - reload：刷新页面
 * - toggleDevTools：开发者工具
 * - quit：退出应用
 */
const menuTemplate = [
  {
    label: '文件',
    submenu: [
      {
        label: '新建窗口',
        accelerator: 'CmdOrCtrl+N',  // 快捷键：Ctrl+N（Windows/Linux）或 Cmd+N（macOS）
        click: () => createWindow()
      },
      { label: '保存', accelerator: 'CmdOrCtrl+S', click: () => {
        // 向当前聚焦窗口发送保存指令
        const focused = BrowserWindow.getFocusedWindow();
        if (focused) focused.webContents.send('menu-save');
      }},
      { type: 'separator' },  // 分隔线
      { label: '退出', role: 'quit' }
    ]
  },
  {
    label: '编辑',
    submenu: [
      { label: '撤销', role: 'undo' },
      { label: '重做', role: 'redo' },
      { type: 'separator' },
      { label: '剪切', role: 'cut' },
      { label: '复制', role: 'copy' },
      { label: '粘贴', role: 'paste' }
    ]
  },
  {
    label: '视图',
    submenu: [
      { label: '刷新', role: 'reload' },
      { label: '开发者工具', role: 'toggleDevTools' }
    ]
  }
];

// macOS 上第一个菜单会自动命名为应用名，需要额外处理
if (process.platform === 'darwin') {
  menuTemplate.unshift({ label: app.name, submenu: [{ role: 'about' }, { role: 'quit' }] });
}

// ==================== 生命周期 ====================

app.whenReady().then(() => {
  createWindow();

  // 设置应用菜单
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

app.on('activate', () => {
  // macOS：点击 Dock 图标时，如果没有窗口则新建一个
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// ==================== IPC：数据操作 ====================

/**
 * IPC: get-notes - 从 electron-store 读取所有笔记
 *
 * store.get('notes', []) 的第二个参数是默认值：
 * 如果 notes 键不存在，返回空数组而非 undefined。
 */
ipcMain.handle('get-notes', () => {
  const notes = store.get('notes', []);
  console.log('【笔记】读取笔记，数量:', notes.length);
  return notes;
});

/**
 * IPC: save-notes - 保存笔记数组到 electron-store
 *
 * electron-store 自动将 JS 对象序列化为 JSON 写入磁盘。
 * 存储位置：~/Library/Application Support/electron-notes/config.json（macOS）
 */
ipcMain.handle('save-notes', (event, notes) => {
  store.set('notes', notes);
  console.log('【笔记】保存笔记，数量:', notes.length);
  return true;
});

/**
 * IPC: create-window - 渲染进程请求新建窗口
 *
 * 例如：用户点击"新建窗口"按钮时，通过 IPC 请求主进程创建新窗口。
 */
ipcMain.handle('create-window', () => {
  const win = createWindow();
  return '新窗口已创建，ID: ' + win.id;
});

/**
 * IPC: delete-note - 删除指定笔记
 *
 * 接收笔记 ID，读取全部笔记，过滤掉该 ID，再写回 store。
 */
ipcMain.handle('delete-note', (event, noteId) => {
  const notes = store.get('notes', []);
  const filtered = notes.filter(n => n.id !== noteId);
  store.set('notes', filtered);
  console.log('【笔记】删除笔记 ID:', noteId, '剩余:', filtered.length);
  return true;
});
