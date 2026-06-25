/**
 * 17-packaging - 预加载脚本：暴露环境信息和资源读取 API
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('packagingAPI', {
  getEnvInfo: () => ipcRenderer.invoke('get-env-info'),
  readExtraResource: (filename) => ipcRenderer.invoke('read-extra-resource', filename)
});
