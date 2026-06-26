/**
 * 01-intro - Electron 预加载脚本 (Preload Script)
 * 
 * 预加载脚本运行在渲染进程的页面加载之前，处于独立的上下文（isolated context）中。
 * 它是主进程和渲染进程之间的"安全桥梁"：
 * - 可以访问 Node.js API（如 require、path、ipcRenderer）
 * - 通过 contextBridge 只暴露白名单中的 API 给页面
 * - 页面 JS 无法直接访问 Node.js，只能通过暴露的 API 间接操作
 * 
 * 这是 Electron 安全架构的核心：隔离 + 最小权限暴露
 */

const { contextBridge, ipcRenderer } = require('electron');

/**
 * contextBridge.exposeInMainWorld(apiKey, apiObject)
 * 
 * 将 apiObject 暴露到渲染进程的 window 对象上，名称为 apiKey。
 * 页面 JS 可以通过 window.electronAPI 访问这些函数。
 * 
 * 参数：
 * - apiKey: 在 window 上的属性名，如 'electronAPI' → window.electronAPI
 * - apiObject: 暴露的 API 对象，可以包含任意函数
 */
contextBridge.exposeInMainWorld('electronAPI', {
  
  /**
   * send(channel, data) - 向主进程发送消息
   * 
   * 底层调用 ipcRenderer.send(channel, data)：
   * - channel: 通信通道名，主进程通过 ipcMain.on(channel) 监听
   * - data: 传递的数据，会被序列化传输（支持 JSON 类型）
   */
  send: (channel, data) => ipcRenderer.send(channel, data),
  
  /**
   * on(channel, callback) - 监听主进程发来的消息
   * 
   * 底层调用 ipcRenderer.on(channel, callback)：
   * - channel: 通信通道名
   * - callback: 接收消息时的回调函数
   * 
   * 注意：ipcRenderer.on 的第一个参数是 event 对象，
   * 但我们通常只关心后续的数据参数，所以用解构忽略 event。
   */
  on: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args))
});
