# 17-packaging - Electron 打包配置深度演示

本章节是一个**可运行、可打包**的 Electron 项目，专门演示各种打包配置和优化技巧。

## 项目特点

- **多套打包配置**：`electron-builder.yml` 和 `electron-builder-full.yml` 对比
- **asar 演示**：配置 asar 的开关，理解源码保护机制
- **外部资源处理**：`extraResources` 演示如何把文件放到 asar 外部
- **图标配置**：多平台图标配置示例（.ico for Windows, .icns for macOS, .png for Linux）
- **多格式打包**：同一平台打包多种格式（如 Windows 的 nsis + portable + zip）
- **环境变量控制**：通过 `ELECTRON_BUILDER_CONFIG` 切换不同配置

## 文件说明

| 文件 | 功能 |
|------|------|
| `package.json` | 项目配置 + 多种打包 scripts |
| `main.js` | **主进程**：演示资源路径处理（打包后路径变化） |
| `preload.js` | **预加载脚本**：暴露资源路径 API |
| `index.html` | **渲染页面**：展示打包配置信息、资源文件读取 |
| `electron-builder.yml` | **基础配置**：简单配置，适合快速上手 |
| `electron-builder-full.yml` | **完整配置**：多平台、多格式、图标、版权等 |
| `extra-resources/` | 外部资源文件（演示 extraResources 配置） |
| `assets/icons/` | 图标目录（不同平台格式） |

## 运行

```bash
npm install
npm start
```

## 打包命令（核心学习内容）

### 基础打包（使用 electron-builder.yml）

```bash
# 使用默认配置（electron-builder.yml）
npm run build

# 输出：
# - dist/MyPackagingDemo-1.0.0.dmg (macOS)
# - dist/MyPackagingDemo Setup 1.0.0.exe (Windows)
# - dist/MyPackagingDemo-1.0.0.AppImage (Linux)
```

### 完整配置打包（使用 electron-builder-full.yml）

```bash
# 使用完整配置打包
npm run build:full

# 输出更多格式：
# macOS: .dmg + .zip
# Windows: .exe (nsis) + .zip (portable) + .msi
# Linux: .AppImage + .deb + .rpm + .snap
```

### 只打特定平台

```bash
# 只打 macOS
npm run build:mac

# 只打 Windows
npm run build:win

# 只打 Linux
npm run build:linux
```

### 不打包 asar（查看源码）

```bash
# 使用 asar: false 的配置，打包后可以直接查看源码
npm run build:no-asar

# 打包后，源码直接暴露在 dist/win-unpacked/resources/app/ 目录下
```

## 打包配置对比

### 基础配置 vs 完整配置

| 特性 | `electron-builder.yml` | `electron-builder-full.yml` |
|------|----------------------|---------------------------|
| 目标 | 快速上手 | 生产环境 |
| 平台格式 | 单格式 | 多格式 |
| 图标 | 无 | 多平台图标 |
| 版权信息 | 无 | 有 |
| 安装程序选项 | 无 | 自定义安装界面 |
| 文件过滤 | 基础 | 详细（排除测试文件等） |
| asar | 默认开启 | 可配置开关 |
| extraResources | 无 | 有 |

## 学习要点

### 1. asar 打包

asar 是 Electron 的归档格式，类似 tar：
- **开启 asar**（默认）：源码打包为 `app.asar`，用户无法直接查看源码
- **关闭 asar**：源码以普通文件放在 `app/` 目录，方便调试

```yaml
asar: true           # 启用 asar 保护源码
asar: false          # 禁用 asar，调试方便
asar:
  smartUnpack: true  # 智能解压：大于某尺寸的文件自动解压
```

### 2. 资源路径处理

打包后 `__dirname` 的行为变化：
- 开发模式：`__dirname` 指向源码目录
- 打包模式（asar: true）：`__dirname` 指向 `app.asar` 内部虚拟路径
- 打包模式（asar: false）：`__dirname` 指向 `resources/app/`

访问外部资源应使用 `process.resourcesPath`：
```js
const path = require('path');
const isDev = !app.isPackaged;
const extraPath = isDev
  ? path.join(__dirname, 'extra-resources')
  : path.join(process.resourcesPath, 'extra-resources');
```

### 3. extraResources

把文件放到 asar 外部，运行时通过 `process.resourcesPath` 访问：
```yaml
extraResources:
  - from: "extra-resources/"
    to: "extra-resources/"
    filter: "**/*"
```
打包后文件位于：`dist/MyApp/resources/extra-resources/`

### 4. 多平台图标

```yaml
mac:
  icon: "assets/icons/icon.icns"    # macOS 图标格式
win:
  icon: "assets/icons/icon.ico"     # Windows 图标格式
linux:
  icon: "assets/icons/icon.png"     # Linux 图标格式
```

图标尺寸建议：
- macOS: 1024x1024px 生成 .icns
- Windows: 256x256px 生成 .ico
- Linux: 512x512px .png

## 打包后目录结构

```
dist/
├── latest.yml                  # 更新信息文件（自动更新用）
├── builder-effective-config.yaml # 实际生效的配置（调试用）
├── mac/
│   └── MyPackagingDemo.app/    # macOS 应用包（未签名）
├── win-unpacked/
│   └── MyPackagingDemo.exe     # Windows 未压缩可执行文件
├── linux-unpacked/
│   └── mypackagingdemo         # Linux 未打包可执行文件
├── MyPackagingDemo-1.0.0.dmg   # macOS 安装镜像
├── MyPackagingDemo Setup 1.0.0.exe  # Windows 安装程序
├── MyPackagingDemo-1.0.0.AppImage   # Linux 单文件应用
└── MyPackagingDemo-1.0.0.zip        # 压缩包（portable）
```

---

**现在可以实际运行打包命令，看到真实的安装包生成！**
