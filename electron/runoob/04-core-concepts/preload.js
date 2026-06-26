/**
 * 04-core-concepts - 预加载脚本：安全暴露 IPC API
 * 
 * 本文件演示两种 IPC 的渲染进程端 API：
 * 1. sendPing() - 封装 ipcRenderer.send()，用于单向通信
 * 2. getAppPath() - 封装 ipcRenderer.invoke()，用于双向通信
 * 
 * 关键设计原则：只暴露必要的函数，不暴露底层 ipcRenderer 对象本身。
 * 这样可以精确控制渲染进程能做什么，防止滥用。
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  
  // ==================== 单向通信 API ====================
  
  /**
   * sendPing(data) - 向主进程发送 'ping' 消息
   * 
   * 底层：ipcRenderer.send('ping', data)
   * 对应主进程：ipcMain.on('ping', (event, data) => {...})
   */
  sendPing: (data) => ipcRenderer.send('ping', data),
  
  // ==================== 双向通信 API ====================
  
  /**
   * getAppPath() - 异步获取应用数据路径
   * 
   * 底层：ipcRenderer.invoke('get-app-path')
   * 对应主进程：ipcMain.handle('get-app-path', () => {...})
   * 
   * 返回 Promise，可以用 await 获取结果：
   *   const path = await window.electronAPI.getAppPath();
   * 
   * 这是 invoke/handle 模式，相比 send/on 的优点：
   * - 结构化返回值（不用额外监听回复通道）
   * - 错误可以自然抛出，通过 Promise.catch 捕获
   * - 代码可读性更好，类似 REST API 调用
   */
  getAppPath: () => ipcRenderer.invoke('get-app-path')
});
