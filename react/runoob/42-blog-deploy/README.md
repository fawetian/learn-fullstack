# 42-blog-deploy: 打包部署配置

来源: https://www.runoob.com/react/react-blog-deploy-vercel.html

## 本章节在博客项目中的角色

本章是博客项目的收官章节。在前面所有功能（JSX 渲染、状态管理、组件拆分、路由、数据请求、搜索、自定义 Hook、全局状态）的基础上，配置 Vite 生产构建选项，添加环境变量管理，并准备部署到 Vercel 等静态托管平台。

## 核心概念

1. **Vite Build** — `vite build` 命令将源码打包为优化后的生产文件（HTML/CSS/JS），输出到 `dist/` 目录。
2. **环境变量** — `.env` 文件定义环境变量，Vite 中必须以 `VITE_` 开头才能在客户端代码中访问。
3. **Base URL** — 如果部署到非根路径（如 GitHub Pages），需要在 `vite.config.js` 中配置 `base` 选项。
4. **静态托管** — Vercel、Netlify 等平台支持直接部署 `dist/` 目录，并提供自动 HTTPS 和 CDN 加速。
5. **服务端路由回退** — SPA 部署时需要配置所有路由回退到 `index.html`，由 React Router 处理客户端路由。

## 文件说明

| 文件 | 说明 |
|------|------|
| `vite.config.js` | 生产构建配置，包含 base URL 和 build 选项 |
| `.env` | 开发环境变量 |
| `.env.production` | 生产环境变量 |
| `src/App.jsx` | 完整版应用入口（包含所有前面章节的功能） |

## 运行方法

```bash
cd 42-blog-deploy
# 开发模式
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview

# 部署到 Vercel（需安装 Vercel CLI）
vercel --prod
```

## 前后章节依赖关系

- **前序章节**：`41-blog-context-reducer` — 提供完整的博客功能，本章在此基础上进行打包部署
- **后续章节**：无（本章是博客项目终点）
