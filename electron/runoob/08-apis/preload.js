/**
 * 08-apis - 预加载脚本：常用 API 演示
 * 
 * 暴露 apiDemo 对象，包含 6 个 API 函数，
 * 分别对应主进程中的 Dialog、Clipboard、Shell 处理。
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('apiDemo', {
  
  // ===== Dialog =====
  showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
  showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
  showMessageBox: () => ipcRenderer.invoke('show-message-box'),
  
  // ===== Clipboard =====
  getClipboard: () => ipcRenderer.invoke('get-clipboard'),
  setClipboard: (text) => ipcRenderer.invoke('set-clipboard', text),
  
  // ===== Shell =====
  openExternal: (url) => ipcRenderer.invoke('open-external', url)
});
