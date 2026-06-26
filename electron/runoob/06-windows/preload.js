/**
 * 06-windows - 预加载脚本：窗口控制 API
 * 
 * 暴露两个窗口控制 API：
 * 1. openChild() - 请求主进程打开子窗口
 * 2. getAppInfo() - 获取应用名称和版本
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  
  /**
   * openChild() - 请求打开子窗口
   * 
   * 底层：ipcRenderer.send('open-child')
   * 对应主进程：ipcMain.on('open-child', () => createChildWindow())
   * 
   * 单向通信：渲染进程通知主进程，不需要返回值。
   */
  openChild: () => ipcRenderer.send('open-child'),
  
  /**
   * getAppInfo() - 异步获取应用信息
   * 
   * 底层：ipcRenderer.invoke('get-app-info')
   * 对应主进程：ipcMain.handle('get-app-info', () => ({...}))
   * 
   * 双向通信：返回 Promise，包含 app name 和 version。
   */
  getAppInfo: () => ipcRenderer.invoke('get-app-info')
});
