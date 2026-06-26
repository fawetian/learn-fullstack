/**
 * 18-react-electron - React 主组件
 * 
 * 本组件演示在 React 中调用 Electron API：
 * 1. 通过 ipcAPI.js 调用 Electron 功能（不直接依赖 electron 模块）
 * 2. useEffect 初始化时获取数据
 * 3. 按钮触发 IPC 调用
 * 
 * 关键：React 代码不直接 require('electron')，
 * 而是通过 window.ipcAPI（Preload 暴露）间接调用。
 * 这样 React 代码在浏览器中也能运行（只是功能不可用）。
 */

import React, { useState, useEffect } from 'react';
import { ipcPing, ipcOpenFile } from './ipcAPI';

function App() {
  const [status, setStatus] = useState('加载中...');
  const [filePath, setFilePath] = useState('');

  useEffect(() => {
    // 组件挂载时，调用 Electron 测试连接
    ipcPing().then(res => setStatus('Electron 连接成功: ' + res));
  }, []);

  const handleOpenFile = async () => {
    const path = await ipcOpenFile();
    if (path) setFilePath(path);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>React + Electron</h1>
      <p>状态: {status}</p>
      <button onClick={handleOpenFile}>选择文件</button>
      {filePath && <p>选中文件: {filePath}</p>}
    </div>
  );
}

export default App;
