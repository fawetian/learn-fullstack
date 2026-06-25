# 39-blog-search: 实时搜索功能

来源: https://www.runoob.com/react/react-blog-search.html

## 本章节在博客项目中的角色

本章在 `38-blog-useeffect` 数据请求的基础上，添加实时搜索功能。用户输入搜索关键词时，通过 `useEffect` 监听输入变化并延迟触发搜索，实现实时过滤文章列表。

## 核心概念

1. **受控组件** — 输入框的 value 由 React 状态控制，onChange 更新状态，实现双向绑定。
2. **防抖（Debounce）** — 延迟执行搜索逻辑，避免用户快速输入时频繁触发请求，提升性能。
3. **useEffect 监听输入** — 将搜索关键词作为 useEffect 的依赖，关键词变化时执行过滤逻辑。
4. **setTimeout 清理** — 每次输入变化时清除上一次的定时器，确保只执行最后一次搜索。
5. **条件过滤** — 根据关键词对数组进行 `filter` 操作，实时更新展示列表。

## 文件说明

| 文件 | 说明 |
|------|------|
| `src/components/SearchBar.jsx` | 搜索栏组件，受控输入框，实时触发搜索 |
| `src/components/ArticleList.jsx` | 文章列表组件，接收搜索关键词并过滤展示 |
| `src/hooks/useDebounce.js` | 简单防抖 Hook（基础版，在 40-blog-custom-hooks 中完善） |

## 运行方法

```bash
cd 39-blog-search
# 将代码复制到 33-blog-project 的 src 目录中
npm install && npm run dev
```

## 前后章节依赖关系

- **前序章节**：`38-blog-useeffect` — 提供数据请求基础，本章在获取的数据上添加搜索过滤
- **后续章节**：`40-blog-custom-hooks` — 将本章和上一章的 Hook 逻辑封装为可复用的自定义 Hook
