# 16-release - Electron 打包与发布实战

本章节是一个**可运行、可打包**的 Electron 项目，演示应用打包和发布流程。

## 项目特点

- **可运行应用**：完整的 Electron 应用，展示打包版本信息
- **electron-builder 配置**：一键打包多平台（Windows/macOS/Linux）
- **自动更新演示**：集成 electron-updater，演示更新检查机制
- **环境检测**：运行时可检测是否为打包版本
- **图标配置**：包含不同平台的图标配置示例

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 + **build 字段**（electron-builder 配置）+ scripts |
| `main.js` | **主进程**：创建窗口，检测打包状态，演示自动更新检查 |
| `preload.js` | **预加载脚本**：暴露版本信息和更新 API |
| `index.html` | **渲染页面**：显示版本信息、打包状态、更新检查按钮 |
| `electron-builder.yml` | electron-builder 独立配置文件（替代 package.json 中的 build 字段）|
| `build/` | 打包输出目录（.gitignore 忽略）|

## 运行开发模式

```bash
npm install
npm start
```

## 打包（核心学习命令）

```bash
# 打包当前平台（开发机对应的平台）
npm run build

# 或者使用 electron-builder 命令
npx electron-builder

# 只打包 Windows（在任意平台交叉编译需要 Wine，macOS 上不可行）
npx electron-builder --win

# 只打包 macOS（只能在 macOS 上执行）
npx electron-builder --mac

# 只打包 Linux
npx electron-builder --linux
```

打包完成后，在 `dist/` 目录下找到安装包：
- **Windows**: `dist/MyApp Setup 1.0.0.exe`
- **macOS**: `dist/MyApp-1.0.0.dmg`（或 .zip）
- **Linux**: `dist/MyApp-1.0.0.AppImage`

## 自动更新机制

本项目集成了 `electron-updater`，演示自动更新检查流程：

1. 应用启动时调用 `autoUpdater.checkForUpdates()`
2. 如果有更新，触发 `update-available` 事件
3. 下载完成后触发 `update-downloaded` 事件
4. 调用 `quitAndInstall()` 重启应用

**注意**：实际自动更新需要配置更新服务器（如 GitHub Releases、S3 等），详见 `main.js` 中的注释。

## 学习要点

- `app.isPackaged` 检测是否为打包版本（开发模式 vs 生产模式）
- `electron-builder` 的 `build` 配置：appId、productName、文件过滤
- `asar` 打包：将源码打包为单个文件，保护源码
- 平台特定配置：`mac`、`win`、`linux` 字段
- 自动更新：electron-updater 的事件机制

## 打包配置详解

配置在 `package.json` 的 `build` 字段（或 `electron-builder.yml`）中：

```json
{
  "build": {
    "appId": "com.example.release-demo",
    "productName": "Electron 发布演示",
    "directories": {
      "output": "dist"
    },
    "files": ["main.js", "preload.js", "index.html"],
    "mac": { "target": "dmg" },
    "win": { "target": "nsis" },
    "linux": { "target": "AppImage" }
  }
}
```

- `appId`：应用唯一标识，用于系统注册
- `productName`：安装包显示的名称
- `directories.output`：打包输出目录
- `files`：包含哪些文件进安装包（可以用通配符和排除规则）
- `mac/win/linux`：平台特定配置

---

**现在不再是纯文档，而是一个真正能打包出安装包的项目！**
