# 17-packaging - Electron 打包应用

本目录为参考目录，包含 Electron 应用打包的详细说明，**不是可运行项目**。

## 打包工具对比

| 工具 | 特点 | 适用场景 |
|------|------|---------|
| electron-packager | 简单，快速 | 快速测试打包 |
| electron-builder | 功能丰富，自动发布 | 生产环境发布 |
| electron-forge | 官方推荐，插件化 | 新项目首选 |

## electron-builder 详细配置

```json
{
  "build": {
    "appId": "com.example.myapp",
    "productName": "My Electron App",
    "copyright": "Copyright © 2024",
    "directories": {
      "output": "dist",
      "buildResources": "build"
    },
    "files": [
      "main.js",
      "preload.js",
      "index.html",
      "assets/**/*",
      "node_modules/**/*"
    ],
    "extraResources": [
      {
        "from": "data/",
        "to": "data/"
      }
    ],
    "mac": {
      "target": [
        {
          "target": "dmg",
          "arch": ["x64", "arm64"]
        }
      ],
      "category": "public.app-category.utilities",
      "hardenedRuntime": true,
      "gatekeeperAssess": false
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64", "ia32"]
        }
      ]
    },
    "linux": {
      "target": [
        {
          "target": "AppImage",
          "arch": ["x64"]
        }
      ],
      "category": "Utility"
    }
  }
}
```

## 打包优化

### 1. 减小包体积

```bash
# 使用 asar 打包
"asar": true

# 排除不需要的文件
"files": [
  "!**/*.map",
  "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
  "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
  "!**/node_modules/*.d.ts"
]
```

### 2. 二进制文件处理

```js
// 使用 electron-builder 的 extraResources
"extraResources": [
  {
    "from": "binaries/${os}/",
    "to": "binaries/",
    "filter": ["**/*"]
  }
]
```

### 3. 环境配置

```js
// 主进程检测打包状态
const isDev = !app.isPackaged;

if (isDev) {
  // 开发环境配置
  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools();
} else {
  // 生产环境配置
  win.loadFile(path.join(__dirname, 'index.html'));
}
```

## 多平台打包

```bash
# 在 macOS 上打包所有平台（需要 Wine 来打包 Windows）
npx electron-builder --mac --win --linux

# 或者使用 CI/CD 分别打包
# GitHub Actions 示例见 electron-builder 文档
```

## 推荐阅读

- [electron-builder 完整配置](https://www.electron.build/configuration/configuration)
- [打包优化指南](https://www.electronjs.org/docs/latest/tutorial/performance)
- [asar 文档](https://www.electronjs.org/docs/latest/tutorial/asar-archives)
