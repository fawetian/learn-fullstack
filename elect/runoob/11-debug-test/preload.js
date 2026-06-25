/**
 * 11-debug-test - 预加载脚本：暴露调试信息
 * 
 * 暴露进程信息到渲染进程，方便调试时查看运行环境。
 */

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('debugAPI', {
  // process.platform: 'darwin' | 'win32' | 'linux'
  platform: process.platform,
  
  // process.versions: Node.js、Chrome、Electron 版本信息
  versions: process.versions
});
