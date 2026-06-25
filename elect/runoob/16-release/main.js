/**
 * 16-release - Electron 打包与发布演示（主进程）
 *
 * 本文件演示一个"可打包应用"的主进程，核心学习点：
 * 1. app.isPackaged - 检测是否为打包版本（区分开发和生产）
 * 2. app.getVersion() - 获取应用版本号（来自 package.json）
 * 3. electron-updater - 自动更新检查机制
 * 4. process.resourcesPath - 打包后资源路径变化
 *
 * 打包后的行为变化：
 * - 开发模式：app.isPackaged === false，__dirname 指向源码目录
 * - 打包模式：app.isPackaged === true，__dirname 指向 asar 包内部
 * - 资源路径：打包后应使用 process.resourcesPath 访问外部资源
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// 引入自动更新（仅在打包后生效）
const { autoUpdater } = require('electron-updater');

/**
 * 打印环境信息，帮助理解开发和打包的区别
 */
console.log('【环境信息】================================');
console.log('app.isPackaged:', app.isPackaged);  // false=开发, true=打包
console.log('app.getVersion():', app.getVersion());  // 从 package.json 读取
console.log('process.resourcesPath:', process.resourcesPath);  // 打包后资源根目录
console.log('__dirname:', __dirname);  // 当前文件所在目录
console.log('============================================');

function createWindow() {
  const win = new BrowserWindow({
    width: 900, height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile('index.html');

  // 开发模式自动打开 DevTools，打包后不打开
  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// ==================== 版本信息 IPC ====================

/**
 * IPC: get-version - 返回应用版本信息
 *
 * 打包后 app.getVersion() 从 package.json 读取，
 * 如果打包时版本号变化，这里会自动更新。
 */
ipcMain.handle('get-version', () => {
  return {
    version: app.getVersion(),           // 版本号，如 "1.0.0"
    isPackaged: app.isPackaged,          // 是否打包版本
    platform: process.platform,          // 平台：darwin/win32/linux
    resourcesPath: process.resourcesPath  // 资源路径（打包后变化）
  };
});

// ==================== 自动更新演示 ====================

/**
 * 自动更新机制演示（electron-updater）
 *
 * 工作流程：
 * 1. checkForUpdates() - 检查服务器是否有新版本
 * 2. 如果有：update-available → 下载 → update-downloaded → 提示安装
 * 3. 如果没有：update-not-available
 *
 * 配置来源：package.json 中 build.publish 字段
 * - provider: "github" | "s3" | "generic"
 * - owner/repo: GitHub 仓库名
 *
 * 实际使用步骤：
 * 1. 在 GitHub 创建 Releases，上传打包文件
 * 2. 设置 package.json 中 publish 配置指向该仓库
 * 3. 发布新版本时，electron-builder 会自动上传并更新 latest.yml
 * 4. 客户端启动时检查更新
 *
 * 注意：开发模式（app.isPackaged === false）不会真正检查更新，
 * 需要打包后运行才能测试自动更新。
 */

// 监听更新事件
autoUpdater.on('checking-for-update', () => {
  console.log('【自动更新】正在检查更新...');
});

autoUpdater.on('update-available', (info) => {
  console.log('【自动更新】发现新版本:', info.version);
});

autoUpdater.on('update-not-available', () => {
  console.log('【自动更新】当前已是最新版本');
});

autoUpdater.on('error', (err) => {
  console.log('【自动更新】错误:', err.message);
});

autoUpdater.on('update-downloaded', () => {
  console.log('【自动更新】下载完成，准备安装');
  // 这里可以提示用户重启，或者直接调用 quitAndInstall()
  // autoUpdater.quitAndInstall();
});

/**
 * IPC: check-update - 手动触发更新检查
 *
 * 在开发模式下调用会提示"跳过检查"（因为 isPackaged 为 false），
 * 打包后的应用会真正连接更新服务器。
 */
ipcMain.handle('check-update', async () => {
  if (!app.isPackaged) {
    return { status: 'dev-mode', message: '开发模式不检查更新（打包后生效）' };
  }
  try {
    const result = await autoUpdater.checkForUpdates();
    return { status: 'checking', result };
  } catch (e) {
    return { status: 'error', message: e.message };
  }
});
