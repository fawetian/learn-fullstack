# 35-blog-usestate: useState 响应式数据

来源: https://www.runoob.com/react/react-blog-state-management.html

## 本章节在博客项目中的角色

本章在 `34-blog-jsx` 静态文章列表的基础上，引入 `useState` Hook 实现响应式数据管理。通过状态驱动 UI 更新，让文章列表可以响应用户交互（如点赞、计数器等）。

## 核心概念

1. **useState** — React 基础状态 Hook，在函数组件中声明响应式状态，状态变化时自动重新渲染组件。
2. **状态不可变** — 更新状态必须调用 `setState` 传入新值，直接修改原状态不会触发重新渲染。
3. **重新渲染机制** — 状态变化后 React 会重新执行该组件函数，生成新的 JSX 并与旧树对比（Diff）。
4. **异步更新** — `setState` 是异步的，同一事件循环中的多次调用可能被合并为一次更新（批处理）。
5. **函数式更新** — 当新状态依赖旧状态时，使用 `setState(prev => prev + 1)` 避免闭包陷阱。

## 文件说明

| 文件 | 说明 |
|------|------|
| `src/components/ArticleList.jsx` | 文章列表组件，添加点赞状态 |
| `src/components/Counter.jsx` | 计数器组件，展示 useState 基础用法 |
| `src/App.jsx` | 根组件，渲染 ArticleList 和 Counter |

## 运行方法

```bash
cd 35-blog-usestate
# 将代码复制到 33-blog-project 的 src 目录中
npm install && npm run dev
```

## 前后章节依赖关系

- **前序章节**：`34-blog-jsx` — 提供 JSX 渲染和静态文章列表基础
- **后续章节**：`36-blog-props` — 在本章组件基础上拆分出子组件，通过 Props 传递状态
