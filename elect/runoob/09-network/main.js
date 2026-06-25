/**
 * 09-network - Electron 网络通信演示
 * 
 * 本文件演示 Electron 的多种网络通信能力：
 * 1. HTTP 请求 - 使用 axios 在后台请求远程 API
 * 2. WebSocket 服务器 - 在 Electron 主进程中启动 WebSocket 服务器
 * 3. WebSocket 客户端 - 渲染进程连接 WebSocket 接收实时推送
 * 4. Cookie 管理 - 通过 session 模块读写 Cookie
 * 
 * 为什么在主进程做网络请求？
 * - 渲染进程可能被 XSS 攻击，直接发网络请求有安全风险
 * - 主进程可以添加请求头、处理代理、管理认证
 * - 主进程可以缓存响应，减少渲染进程负担
 */

const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const axios = require('axios');       // HTTP 客户端库
const WebSocket = require('ws');      // WebSocket 库

let mainWindow;

/**
 * 创建 WebSocket 服务器
 * 
 * WebSocket 服务器运行在 Electron 主进程中，
 * 端口 8081，监听客户端连接并定时推送消息。
 * 
 * 这展示了 Electron 不仅可以作为客户端，
 * 还可以作为服务器（因为它有完整的 Node.js 能力）。
 */
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  console.log('【WebSocket】客户端已连接');
  
  // 连接后立即发送欢迎消息
  ws.send('欢迎连接 WebSocket 实时数据');
  
  // 每 3 秒推送一条实时消息（模拟实时数据流）
  const interval = setInterval(() => {
    ws.send('实时消息：' + new Date().toLocaleTimeString());
  }, 3000);
  
  // 客户端断开时清理定时器，防止内存泄漏
  ws.on('close', () => {
    console.log('【WebSocket】客户端断开');
    clearInterval(interval);
  });
});

console.log('【WebSocket】服务器已启动，端口 8081');

/**
 * createWindow() - 创建主窗口
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// ==================== IPC: HTTP 请求 ====================

/**
 * IPC: fetch-data - 主进程发起 HTTP 请求
 * 
 * 使用 axios 请求 jsonplaceholder.typicode.com（免费测试 API），
 * 返回第一个 post 的数据。
 * 
 * 错误处理：如果请求失败，返回 { error: message } 而不是抛异常，
 * 这样渲染进程可以优雅地处理错误。
 */
ipcMain.handle('fetch-data', async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log('【HTTP】获取数据成功');
    return res.data;  // { userId, id, title, body }
  } catch (err) {
    console.error('【HTTP】请求失败:', err.message);
    return { error: err.message };
  }
});

// ==================== IPC: WebSocket 连接 ====================

/**
 * IPC: connect-ws - 主进程连接 WebSocket 服务器并转发消息
 * 
 * 主进程作为 WebSocket 客户端连接到本地的 ws://localhost:8081，
 * 收到消息后通过 webContents.send() 转发给渲染进程。
 * 
 * 为什么主进程做客户端而不是渲染进程直接连？
 * - 主进程可以处理重连、认证、心跳等逻辑
 * - 渲染进程不直接暴露网络连接能力，更安全
 * - 多个窗口可以共享同一个 WebSocket 连接
 */
ipcMain.handle('connect-ws', async () => {
  return new Promise(resolve => {
    const ws = new WebSocket('ws://localhost:8081');
    
    ws.on('open', () => {
      console.log('【WebSocket】已连接到服务器');
    });
    
    ws.on('message', (msg) => {
      // 将收到的消息转发给渲染进程
      // 所有渲染进程可以通过 ipcRenderer.on('ws-message') 监听
      mainWindow.webContents.send('ws-message', msg.toString());
    });
    
    resolve('WebSocket 连接已建立');
  });
});

// ==================== IPC: Cookie 管理 ====================

/**
 * IPC: set-cookie - 写入 Cookie
 * 
 * session.defaultSession.cookies.set(cookie) 参数：
 * - url: Cookie 关联的 URL（必须匹配）
 * - name: Cookie 名称
 * - value: Cookie 值
 * - expirationDate: 过期时间（Unix 时间戳，秒）
 */
ipcMain.handle('set-cookie', async (event, name, value) => {
  await session.defaultSession.cookies.set({
    url: 'http://localhost',           // Cookie 关联的 URL
    name,                              // Cookie 名称
    value,                             // Cookie 值
    expirationDate: Date.now() / 1000 + 3600  // 1 小时后过期
  });
  console.log('【Cookie】已设置:', name, '=', value);
  return 'Cookie 设置成功';
});

/**
 * IPC: get-cookie - 读取 Cookie
 * 
 * session.defaultSession.cookies.get(filter) 参数：
 * - url: 过滤 URL
 * - name: 过滤 Cookie 名称
 * 
 * 返回 Cookie 数组，每个元素包含 name, value, domain, path 等。
 */
ipcMain.handle('get-cookie', async (event, name) => {
  const cookies = await session.defaultSession.cookies.get({
    url: 'http://localhost',
    name
  });
  console.log('【Cookie】读取:', name, '=', cookies.length > 0 ? cookies[0].value : null);
  return cookies.length ? cookies[0].value : null;
});
