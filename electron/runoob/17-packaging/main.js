/**
 * 17-packaging - Electron 打包配置深度演示（主进程）
 *
 * 本文件核心学习点：打包后的资源路径处理和环境检测。
 *
 * 开发模式 vs 打包模式的差异：
 * ┌──────────────┬──────────────────────┬────────────────────────────────────┐
 * │     特性     │      开发模式        │            打包模式                  │
 * ├──────────────┼──────────────────────┼────────────────────────────────────┤
 * │ isPackaged   │ false                │ true                               │
 * │ __dirname    │ 源码目录             │ app.asar/ 内（asar=true）          │
 * │              │                      │ resources/app/（asar=false）        │
 * │ 外部资源路径  │ ./extra-resources/   │ process.resourcesPath/extra-res/   │
 * │ Node 调试    │ 直接可用             │ 需要 unpack 或 disable asar        │
 * └──────────────┴──────────────────────┴────────────────────────────────────┘
 *
 * 路径处理最佳实践：
 * 1. 源码文件（JS/HTML/CSS）：通过 __dirname 访问，asar 会自动处理
 * 2. 外部资源（二进制、数据库、配置文件）：通过 process.resourcesPath 访问
 * 3. 用户数据：通过 app.getPath('userData') 访问（可写目录）
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

console.log('【打包演示】环境信息 =======================');
console.log('isPackaged:', app.isPackaged);
console.log('__dirname:', __dirname);
console.log('resourcesPath:', process.resourcesPath);
console.log('userData:', app.getPath('userData'));
console.log('============================================');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.loadFile('index.html');
  if (!app.isPackaged) win.webContents.openDevTools();
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// ==================== 环境信息 IPC ====================

/**
 * IPC: get-env-info - 返回完整的环境和路径信息
 *
 * 帮助理解不同模式下的路径差异。
 */
ipcMain.handle('get-env-info', () => {
  // 计算外部资源路径：打包后使用 process.resourcesPath
  const extraResourcePath = app.isPackaged
    ? path.join(process.resourcesPath, 'extra-resources')
    : path.join(__dirname, 'extra-resources');

  // 检查外部资源是否存在
  let extraFiles = [];
  try {
    if (fs.existsSync(extraResourcePath)) {
      extraFiles = fs.readdirSync(extraResourcePath);
    }
  } catch(e) {
    extraFiles = ['读取失败: ' + e.message];
  }

  return {
    isPackaged: app.isPackaged,
    version: app.getVersion(),
    platform: process.platform,
    __dirname: __dirname,
    resourcesPath: process.resourcesPath,
    userDataPath: app.getPath('userData'),
    extraResourcePath: extraResourcePath,
    extraFiles: extraFiles,
    // 重要：演示 asar 是否启用（通过判断 __dirname 是否包含 app.asar）
    asarEnabled: __dirname.includes('app.asar')
  };
});

// ==================== 读取外部资源 ====================

/**
 * IPC: read-extra-resource - 读取外部资源文件内容
 *
 * 演示 extraResources 配置的效果：
 * 打包后这些文件在 process.resourcesPath 下，不在 asar 内部。
 */
ipcMain.handle('read-extra-resource', (event, filename) => {
  const basePath = app.isPackaged
    ? path.join(process.resourcesPath, 'extra-resources')
    : path.join(__dirname, 'extra-resources');
  const filePath = path.join(basePath, filename);

  try {
    if (!fs.existsSync(filePath)) {
      return { error: '文件不存在: ' + filePath };
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return { content };
  } catch(e) {
    return { error: e.message };
  }
});
