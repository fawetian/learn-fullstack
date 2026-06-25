/**
 * 12-security - 预加载脚本：最小化安全 API
 * 
 * 只暴露一个 safeAction 函数，不暴露任何底层 IPC 对象。
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('safeAPI', {
  safeAction: (data) => ipcRenderer.invoke('safe-action', data)
});
