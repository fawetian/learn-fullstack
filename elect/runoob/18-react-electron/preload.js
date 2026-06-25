/**
 * 18-react-electron - 预加载脚本：暴露 IPC API 给 React
 * 
 * React 通过 window.ipcAPI 调用 Electron 功能，
 * 而不是直接使用 electron 模块（安全隔离）。
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcAPI', {
  ping: () => ipcRenderer.invoke('react-ping'),
  openFile: () => ipcRenderer.invoke('react-open-file')
});
