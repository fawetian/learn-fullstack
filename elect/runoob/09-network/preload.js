/**
 * 09-network - 预加载脚本：网络通信 API
 * 
 * 暴露三类网络 API：
 * 1. HTTP 请求 - fetchData()
 * 2. WebSocket 连接 - connectWS() + onWSMessage()
 * 3. Cookie 管理 - setCookie() + getCookie()
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  
  // ===== HTTP 请求 =====
  fetchData: () => ipcRenderer.invoke('fetch-data'),
  
  // ===== WebSocket =====
  connectWS: () => ipcRenderer.invoke('connect-ws'),
  onWSMessage: (callback) => ipcRenderer.on('ws-message', (event, msg) => callback(msg)),
  
  // ===== Cookie =====
  setCookie: (name, value) => ipcRenderer.invoke('set-cookie', name, value),
  getCookie: (name) => ipcRenderer.invoke('get-cookie', name)
});
