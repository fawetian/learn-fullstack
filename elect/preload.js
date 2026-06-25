// 文件路径：preload.js
const { contextBridge, ipcRenderer } = require("electron");

// 通过 contextBridge 向渲染进程暴露安全的 API
// 渲染进程可通过 window.electronAPI 访问
contextBridge.exposeInMainWorld("electronAPI", {
    // 向主进程发送消息（仅允许白名单中的 channel）
    send: (channel, data) => {
        const validChannels = ["ping"]; // 白名单：允许的 channel
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    // 从主进程接收消息（仅允许白名单中的 channel）
    on: (channel, func) => {
        const validChannels = ["pong"]; // 白名单：允许的 channel
        if (validChannels.includes(channel)) {
            // 移除 event 参数，只传递业务数据给回调
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
});
