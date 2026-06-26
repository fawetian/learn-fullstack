/**
 * 19-vue-electron - 预加载脚本：暴露 IPC API 给 Vue
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcAPI', {
  ping: () => ipcRenderer.invoke('vue-ping'),
  openFile: () => ipcRenderer.invoke('vue-open-file')
});
