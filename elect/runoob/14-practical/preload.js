/**
 * 14-practical - 预加载脚本：综合 API 暴露
 * 
 * 暴露所有实战功能：多窗口、文件、通知、Shell 操作
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('practicalAPI', {
  createNewWindow: () => ipcRenderer.invoke('create-new-window'),
  selectAndReadFile: () => ipcRenderer.invoke('select-and-read-file'),
  showNotification: (title, body) => ipcRenderer.invoke('show-notification', title, body),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  showInFolder: (filePath) => ipcRenderer.invoke('show-in-folder', filePath)
});
