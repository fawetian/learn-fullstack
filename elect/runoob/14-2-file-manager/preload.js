/**
 * 14-2-file-manager - 预加载脚本：暴露文件操作 API
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fsAPI', {
  // 选择根目录
  selectRoot: () => ipcRenderer.invoke('select-root'),

  // 构建目录树（递归）
  buildTree: (dirPath) => ipcRenderer.invoke('build-tree', dirPath),

  // 读取文件列表
  listFiles: (dirPath) => ipcRenderer.invoke('list-files', dirPath),

  // 文件操作
  createFile: (dirPath, filename) => ipcRenderer.invoke('create-file', dirPath, filename),
  createDir: (dirPath, dirname) => ipcRenderer.invoke('create-dir', dirPath, dirname),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),
  renameFile: (oldPath, newName) => ipcRenderer.invoke('rename-file', oldPath, newName),
  moveFile: (sourcePath, targetDir) => ipcRenderer.invoke('move-file', sourcePath, targetDir),

  // 读取文件内容（查看文本）
  readFileContent: (filePath) => ipcRenderer.invoke('read-file-content', filePath)
});
