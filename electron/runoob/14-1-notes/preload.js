/**
 * 14-1-notes - 预加载脚本：暴露笔记操作 API
 *
 * 通过 contextBridge 将 electron-store 的读写操作安全暴露给渲染进程。
 * 渲染进程无法直接访问 store，只能通过这些白名单函数操作。
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('notesAPI', {
  // 读取所有笔记
  getNotes: () => ipcRenderer.invoke('get-notes'),

  // 保存笔记数组（覆盖式保存）
  saveNotes: (notes) => ipcRenderer.invoke('save-notes', notes),

  // 删除指定笔记
  deleteNote: (noteId) => ipcRenderer.invoke('delete-note', noteId),

  // 请求新建窗口
  createWindow: () => ipcRenderer.invoke('create-window'),

  // 监听菜单"保存"指令（主进程通过 webContents.send 发送）
  onMenuSave: (callback) => {
    ipcRenderer.on('menu-save', (event) => callback());
  }
});
