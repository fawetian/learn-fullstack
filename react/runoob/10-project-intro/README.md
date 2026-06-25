# 10-project-intro: React 项目结构

来源: https://www.runoob.com/react/react-project-intro.html

## 核心概念

1. **标准目录结构** — `src/` 存放源码（组件、工具、样式），`public/` 存放静态资源（图片、图标），`index.html` 是页面入口模板。
2. **组件目录** — 推荐按功能或类型组织组件（`components/`、`pages/`、`hooks/`、`utils/`），保持项目可维护性。
3. **模块化开发** — 每个文件只负责一个功能（单一职责原则），通过 ES Modules 的 `import/export` 组合成完整应用。
4. **Vite 配置** — `vite.config.js` 是项目构建配置入口，可添加别名、代理、插件等自定义配置。
5. **环境变量** — `.env` 文件定义不同环境（开发/测试/生产）的变量，以 `VITE_` 开头的变量可在客户端代码中访问。

## 文件说明

| 文件 | 说明 |
|------|------|
| `example_1.js` | 标准 React 项目目录结构说明 |

## 运行/学习方法

本章是项目结构说明章节，无需运行代码。理解以下目录组织方式：

```
react-blog/
├── public/          # 静态资源（不经过构建处理）
├── src/
│   ├── components/  # 可复用 UI 组件
│   ├── pages/       # 页面级组件
│   ├── hooks/       # 自定义 Hooks
│   ├── context/     # Context 全局状态
│   ├── utils/       # 工具函数
│   ├── App.jsx      # 根组件
│   └── main.jsx     # 应用入口
├── index.html       # HTML 模板
├── package.json     # 项目配置
└── vite.config.js   # 构建配置
```

`33-blog-project` 到 `42-blog-deploy` 将严格按照此结构构建博客项目。
