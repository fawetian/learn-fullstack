# 19-vue-electron - Vue 与 Electron 集成

本章节演示 Vue 与 Electron 的集成：
- **Vue CLI + electron-builder** - 标准集成方案
- **Vue 渲染进程** - Vue 组件运行在 Electron 中
- **IPC 通信** - Vue 组件通过 Preload 调用 Electron API
- **Vuex 状态管理** - 可选：跨组件状态管理

## 项目结构

```
19-vue-electron/
├── src/
│   ├── main.js            # Vue 应用入口
│   ├── App.vue            # Vue 根组件
│   ├── components/
│   │   └── IpcDemo.vue    # IPC 演示组件
│   └── electron/          # Electron 主进程代码
│       └── main.js        # 主进程入口
├── public/
│   └── index.html         # HTML 模板
├── preload.js             # 预加载脚本
├── vue.config.js          # Vue CLI 配置（electron-builder 配置）
├── package.json           # 配置 scripts
└── README.md              # 本文件
```

## 文件说明

| 文件 | 功能 |
|------|------|
| `src/electron/main.js` | **主进程**：创建窗口，加载 Vue 应用 |
| `src/main.js` | Vue 应用入口 |
| `src/App.vue` | Vue 根组件 |
| `src/components/IpcDemo.vue` | IPC 演示组件 |
| `preload.js` | **预加载脚本**：暴露 ipcAPI 到 window |
| `public/index.html` | HTML 模板 |
| `vue.config.js` | Vue CLI 配置 + electron-builder 配置 |
| `package.json` | 配置 `npm run electron:serve` |

## 运行

```bash
npm install
npm run electron:serve   # 开发模式（同时启动 Vue + Electron）
npm run electron:build     # 打包 Vue + Electron 应用
```

## 架构说明

```
Vue 组件 (.vue)
    ↓ 调用
window.ipcAPI (preload.js 暴露)
    ↓ IPC
主进程 (src/electron/main.js)
    ↓ 返回结果
Vue 响应式更新界面
```
