# 02-install - Electron 安装指南

本目录为参考目录，包含 Electron 安装的说明和命令，**不是可运行项目**。

## 安装方法

### 全局安装（不推荐）
```bash
npm install -g electron
```

### 项目本地安装（推荐）
```bash
# 创建项目目录
mkdir my-electron-app && cd my-electron-app

# 初始化项目
npm init -y

# 安装 Electron 为开发依赖
npm install --save-dev electron

# 或者安装最新版本
npm install --save-dev electron@latest
```

### 版本选择

| 版本类型 | 说明 | 适用场景 |
|---------|------|---------|
| 稳定版 (Stable) | 经过充分测试 | 生产环境 |
| 测试版 (Beta) | 新功能预览 | 提前体验新功能 |
| 每夜版 (Nightly) | 最新代码 | 开发测试 |

## 加速下载

Electron 下载可能较慢，可使用镜像：
```bash
# 设置淘宝镜像
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/

# 或使用环境变量
ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ npm install electron
```

## 验证安装

```bash
# 查看 Electron 版本
npx electron --version

# 或者
./node_modules/.bin/electron --version
```

## 快速启动

```bash
# 创建 main.js 和 index.html
# 然后运行
npx electron .
```
