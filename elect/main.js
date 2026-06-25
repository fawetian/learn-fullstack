// 文件路径：main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// 创建主窗口
function createWindow() {
    console.log("[main] createWindow() called");
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        show: false, // 先隐藏，等加载完成再显示，避免闪烁
        center: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // 预加载脚本路径
            contextIsolation: true, // 开启上下文隔离（推荐）
            nodeIntegration: false, // 关闭 Node 集成以提高安全性
        },
    });

    win.loadFile("index.html");

    // 页面加载完成后显示并聚焦窗口
    win.once("ready-to-show", () => {
        console.log("[main] window ready-to-show");
        win.show();
        win.focus();
    });

    // 打开开发者工具，方便查看渲染进程日志
    win.webContents.openDevTools();

    // 窗口关闭日志
    win.on("closed", () => {
        console.log("[main] window closed");
    });
}

// app 就绪后创建窗口
app.whenReady().then(() => {
    console.log("[main] app ready");
    createWindow();
});

// macOS：点击 Dock 图标时如果没有窗口则重新创建
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// macOS：关闭所有窗口时不退出应用（符合 macOS 惯例）
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// 监听渲染进程发来的 ping 消息，回复 pong
ipcMain.on("ping", (event, data) => {
    console.log("[main] 收到 ping，数据：", data);
    event.sender.send("pong", { reply: "ok", received: data });
});
