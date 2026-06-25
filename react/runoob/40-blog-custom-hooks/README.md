# 40-blog-custom-hooks: 自定义 Hook

来源: https://www.runoob.com/react/react-blog-custom-hooks.html

## 本章节在博客项目中的角色

本章将 `38-blog-useeffect` 和 `39-blog-search` 中重复的副作用逻辑封装为可复用的自定义 Hook（`useFetch`、`useDebounce`）。通过自定义 Hook 实现逻辑复用，让组件代码更简洁、更专注 UI 渲染。

## 核心概念

1. **自定义 Hook** — 以 `use` 开头的函数，内部可以调用其他 Hook，将组件逻辑提取为可复用函数。
2. **逻辑复用** — 自定义 Hook 是 React 逻辑复用的主要方式（替代高阶组件和 Render Props）。
3. **Hook 规则** — 自定义 Hook 必须遵守 Hook 规则：只能在顶层调用，不能嵌套在 if/循环/普通函数中。
4. **状态隔离** — 每次调用自定义 Hook 都会创建独立的状态，互不干扰。
5. **参数与返回值** — 自定义 Hook 通过参数接收输入，通过返回值暴露状态和操作函数。

## 文件说明

| 文件 | 说明 |
|------|------|
| `src/hooks/useFetch.js` | 完整版数据请求 Hook，支持 URL、选项配置和手动刷新 |
| `src/hooks/useDebounce.js` | 完整版防抖 Hook，支持延迟时间和立即执行选项 |
| `src/components/ArticleList.jsx` | 使用自定义 Hook 的文章列表组件 |
| `src/components/SearchBar.jsx` | 搜索栏组件 |
| `src/pages/HomePage.jsx` | 首页，组合 SearchBar 和 ArticleList |

## 运行方法

```bash
cd 40-blog-custom-hooks
# 将代码复制到 33-blog-project 的 src 目录中
npm install && npm run dev
```

## 前后章节依赖关系

- **前序章节**：`38-blog-useeffect` 和 `39-blog-search` — 提供数据请求和搜索逻辑，本章将其封装为自定义 Hook
- **后续章节**：`41-blog-context-reducer` — 引入全局状态管理，替代局部的 useState 状态
