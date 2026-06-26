/**
 * 07-native-features - 预加载脚本：原生功能 API 暴露
 * 
 * 暴露两个 API 给渲染进程：
 * 1. showDialog() - 请求主进程显示对话框
 * 2. onFileOpened(callback) - 监听主进程发来的文件打开事件
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  
  /**
   * showDialog() - 请求主进程显示信息对话框
   * 
   * 底层：ipcRenderer.invoke('show-dialog')
   * 对应主进程：ipcMain.handle('show-dialog', async () => {...})
   * 
   * 返回用户点击的按钮索引（如 0=确定, 1=取消）。
   */
  showDialog: () => ipcRenderer.invoke('show-dialog'),

  /** showNotification() - 请求主进程显示系统通知（右上角弹窗） */
  showNotification: () => ipcRenderer.invoke('show-notification'),

  /** showAbout() - 请求主进程显示"关于"对话框 */
  showAbout: () => ipcRenderer.invoke('show-about'),

  /** openFile() - 请求主进程打开文件选择对话框，结果通过 onFileOpened 返回 */
  openFile: () => ipcRenderer.invoke('open-file'),
  
  /**
   * onFileOpened(callback) - 监听主进程打开文件的事件
   * 
   * 底层：ipcRenderer.on('file-opened', callback)
   * 对应主进程：mainWindow.webContents.send('file-opened', filePath)
   * 
   * 使用场景：用户通过菜单"打开文件"选择文件后，
   * 主进程将文件路径发送给渲染进程，页面显示该路径。
   */
  onFileOpened: (callback) => ipcRenderer.on('file-opened', (event, path) => callback(path))
});
