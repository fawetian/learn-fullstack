# 37-blog-router: React Router 路由配置

来源: https://www.runoob.com/react/react-blog-router.html

## 本章节在博客项目中的角色

本章在 `36-blog-props` 组件拆分的基础上，引入 React Router 实现多页面路由切换。将博客从单页应用升级为支持首页、文章页、关于页的多路由 SPA。

## 核心概念

1. **React Router** — React 官方推荐的路由库，实现 SPA 中无刷新的页面切换。
2. **BrowserRouter** — 使用 HTML5 History API 管理 URL，URL 格式干净（`/about`），需要服务端配置支持。
3. **Routes / Route** — 声明式路由配置，`path` 匹配 URL，`element` 指定渲染的组件。
4. **Link / NavLink** — 声明式导航组件，使用客户端路由切换，避免页面刷新。
5. **useParams** — 获取 URL 动态参数（如 `/article/:id` 中的 `id`），用于详情页数据查询。

## 文件说明

| 文件 | 说明 |
|------|------|
| `src/App.jsx` | 路由根组件，配置 BrowserRouter 和 Routes |
| `src/pages/HomePage.jsx` | 首页，包含 ArticleList |
| `src/pages/ArticlePage.jsx` | 文章详情页，使用 useParams 获取文章 ID |
| `src/pages/AboutPage.jsx` | 关于页面 |
| `src/components/NavBar.jsx` | 导航栏，使用 NavLink 实现路由导航 |

## 运行方法

```bash
cd 37-blog-router
# 需要先安装 react-router-dom:
# npm install react-router-dom
# 将代码复制到 33-blog-project 的 src 目录中
npm install && npm run dev
```

## 前后章节依赖关系

- **前序章节**：`36-blog-props` — 提供组件拆分和 Props 传递基础
- **后续章节**：`38-blog-useeffect` — 在路由页面中添加 useEffect 数据请求
