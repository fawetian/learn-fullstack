# 16-release - Electron 发布应用

本目录为参考目录，包含 Electron 应用发布的方法和配置，**不是可运行项目**。

## 发布方法

### 1. 手动打包

使用 electron-packager 或 electron-builder：

```bash
# 安装打包工具
npm install --save-dev electron-packager

# 打包当前平台
npx electron-packager . MyApp

# 打包所有平台
npx electron-packager . MyApp --all
```

### 2. 使用 electron-builder

electron-builder 支持自动打包和发布到 GitHub Releases：

```bash
# 安装
npm install --save-dev electron-builder

# 配置 package.json 中的 build 字段
{
  "build": {
    "appId": "com.example.myapp",
    "productName": "My App",
    "directories": {
      "output": "dist"
    },
    "files": [
      "main.js",
      "preload.js",
      "index.html",
      "node_modules/**/*"
    ],
    "mac": {
      "category": "public.app-category.utilities"
    },
    "win": {
      "target": "nsis"
    }
  }
}

# 打包
npm run dist
```

### 3. 自动更新（electron-updater）

```bash
npm install electron-updater
```

```js
// main.js
const { autoUpdater } = require('electron-updater');

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});
```

## 代码签名（Code Signing）

### macOS
- 需要 Apple Developer ID
- 使用 codesign 工具签名
- 公证（Notarization）需要在 Apple 开发者网站配置

### Windows
- 需要代码签名证书（如 DigiCert、Sectigo）
- 使用 signtool 签名
- 或者使用 Windows Store 发布（不需要独立签名）

## 平台特定配置

| 平台 | 打包格式 | 特殊要求 |
|------|---------|---------|
| macOS | .dmg, .zip | 代码签名、公证 |
| Windows | .exe, .msi | 代码签名（可选） |
| Linux | .deb, .rpm, AppImage | 无特殊要求 |

## 推荐阅读

- [electron-builder 文档](https://www.electron.build/)
- [electron-packager 文档](https://github.com/electron/electron-packager)
- [代码签名指南](https://www.electronjs.org/docs/latest/tutorial/code-signing)
