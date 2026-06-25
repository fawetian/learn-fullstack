# 41-blog-context-reducer: Context + useReducer 全局状态

来源: https://www.runoob.com/react/react-blog-context-reducer.html

## 本章节在博客项目中的角色

本章在 `40-blog-custom-hooks` 的基础上，引入 React Context 和 `useReducer` 实现全局状态管理。将文章列表、搜索关键词、点赞状态等从局部组件状态提升到全局，实现跨组件状态共享，避免 Props 层层传递（Props Drilling）。

## 核心概念

1. **Context API** — React 内置的跨组件数据传递机制，通过 `Provider` 提供数据，`useContext` 消费数据。
2. **useReducer** — 状态管理 Hook，类似 Redux 的 reducer 模式，通过 `dispatch` 发送 action 来更新状态。
3. **状态提升** — 将多个组件共享的状态提升到它们最近的共同祖先或全局 Context 中管理。
4. **Props Drilling 避免** — Context 让深层组件直接访问全局状态，无需通过中间层逐层传递 Props。
5. **Reducer 设计** — 将状态更新逻辑集中到 reducer 函数中，每个 action 描述"发生了什么"，reducer 描述"如何更新"。

## 文件说明

| 文件 | 说明 |
|------|------|
| `src/context/BlogContext.jsx` | Context 创建和 Provider 组件，提供全局状态和方法 |
| `src/reducers/blogReducer.js` | Reducer 函数，定义所有状态更新逻辑 |
| `src/components/ArticleList.jsx` | 使用 Context 获取文章数据和搜索关键词 |
| `src/components/NavBar.jsx` | 使用 Context 获取博客标题 |
| `src/components/SearchBar.jsx` | 通过 Context dispatch 更新搜索关键词 |
| `src/App.jsx` | 根组件包裹 BlogProvider |

## 运行方法

```bash
cd 41-blog-context-reducer
# 将代码复制到 33-blog-project 的 src 目录中
npm install && npm run dev
```

## 前后章节依赖关系

- **前序章节**：`40-blog-custom-hooks` — 提供可复用的数据请求逻辑，本章将其结果存入全局 Context
- **后续章节**：`42-blog-deploy` — 在全局状态管理完善的基础上进行打包部署
