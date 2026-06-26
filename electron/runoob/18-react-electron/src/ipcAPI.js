/**
 * 18-react-electron - IPC API 封装层
 * 
 * 将 window.ipcAPI 封装为 React 友好的 Promise API。
 * 这样 React 组件不直接依赖 window.ipcAPI，
 * 方便测试和将来迁移（如改为 Web API）。
 * 
 * 安全提示：
 * - 在生产环境中检查 window.ipcAPI 是否存在（防止浏览器中报错）
 * - 返回 Promise 统一接口
 */

// 检查是否在 Electron 环境中
const isElectron = () => {
  return window.ipcAPI !== undefined;
};

export const ipcPing = () => {
  if (!isElectron()) return Promise.resolve('浏览器环境（无 Electron）');
  return window.ipcAPI.ping();
};

export const ipcOpenFile = () => {
  if (!isElectron()) return Promise.resolve(null);
  return window.ipcAPI.openFile();
};
