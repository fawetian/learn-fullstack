# 38-blog-useeffect: useEffect 数据请求

来源: https://www.runoob.com/react/react-blog-data-fetching.html

## 本章节在博客项目中的角色

本章在 `37-blog-router` 路由页面的基础上，引入 `useEffect` Hook 从远程 API 获取文章数据。将静态数据替换为异步数据请求，实现真实的数据驱动渲染。

## 核心概念

1. **useEffect** — React 副作用 Hook，在组件渲染后执行副作用（如数据请求、DOM 操作、订阅）。
2. **依赖数组** — 控制 useEffect 的执行时机：`[]` 只在挂载时执行，`[dep]` 在依赖变化时执行，无依赖数组每次渲染都执行。
3. **清理函数** — useEffect 返回的函数在组件卸载或依赖变化前执行，用于取消请求、移除订阅等。
4. **AbortController** — 原生 API 用于取消 fetch 请求，避免组件卸载后更新已卸载状态。
5. **加载状态** — 异步请求期间显示 Loading 状态，提升用户体验。

## 文件说明

| 文件 | 说明 |
|------|------|
| `src/components/ArticleList.jsx` | 文章列表组件，使用 useEffect 从 API 获取数据 |
| `src/hooks/useFetch.js` | 简单数据请求 Hook（基础版，在 40-blog-custom-hooks 中完善） |
| `src/pages/HomePage.jsx` | 首页，渲染 ArticleList |

## 运行方法

```bash
cd 38-blog-useeffect
# 将代码复制到 33-blog-project 的 src 目录中
npm install && npm run dev
```

## 前后章节依赖关系

- **前序章节**：`37-blog-router` — 提供路由页面结构，本章在页面中加载真实数据
- **后续章节**：`39-blog-search` — 在获取数据的基础上添加搜索过滤功能
