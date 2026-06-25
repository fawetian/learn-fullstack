/**
 * 15-advanced - 预加载脚本：高级 API 暴露
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('advancedAPI', {
  broadcast: (message) => ipcRenderer.invoke('broadcast', message),
  createWindow: () => ipcRenderer.invoke('create-window'),
  getProtocolUrl: () => ipcRenderer.invoke('get-protocol-url'),
  
  // 监听广播消息：onBroadcast 是回调函数，通过 ipcRenderer.on 注册
  onBroadcast: (callback) => {
    ipcRenderer.on('broadcast-message', (event, message) => callback(message));
  }
});
