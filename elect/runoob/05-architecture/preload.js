/**
 * 05-architecture - 预加载脚本：安全暴露文件操作 API
 * 
 * 设计原则：
 * 1. 不直接暴露 ipcRenderer 对象，防止渲染进程滥用
 * 2. 只暴露两个明确命名的函数：readFile 和 selectFile
 * 3. 渲染进程无法直接访问 fs 或 dialog，所有操作通过主进程代理
 * 
 * 安全优势：
 * - 即使页面被 XSS 攻击，攻击者也只能调用 readFile/selectFile，
 *   无法执行任意文件系统操作或打开任意对话框。
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fileAPI', {
  
  /**
   * readFile(filePath) - 读取指定文件内容
   * 
   * 底层：ipcRenderer.invoke('read-file', filePath)
   * 对应主进程：ipcMain.handle('read-file', async (event, filePath) => {...})
   * 
   * 返回 Promise<{ success: boolean, content?: string, error?: string }>
   */
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  
  /**
   * selectFile() - 打开系统文件选择对话框
   * 
   * 底层：ipcRenderer.invoke('select-file')
   * 对应主进程：ipcMain.handle('select-file', async () => {...})
   * 
   * 返回 Promise<{ canceled: boolean, filePaths: string[] }>
   */
  selectFile: () => ipcRenderer.invoke('select-file')
});
