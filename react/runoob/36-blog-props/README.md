# 36-blog-props: Props 拆分组件

来源: https://www.runoob.com/react/react-blog-props-component.html

## 本章节在博客项目中的角色

本章在 `35-blog-usestate` 的基础上，将臃肿的单文件组件拆分为独立的子组件（NavBar、ArticleCard、Footer）。通过 Props 在父子组件间传递数据和回调函数，实现组件复用和职责分离。

## 核心概念

1. **Props** — 父组件向子组件传递数据的机制，Props 是只读的（不可修改）。
2. **组件拆分** — 按 UI 区域或功能职责拆分组件，每个组件只关注一件事。
3. **回调传递** — 父组件将函数通过 Props 传给子组件，子组件调用该函数通知父组件状态变化。
4. **单向数据流** — 数据从父组件流向子组件，状态提升（Lifting State Up）到共同祖先管理。
5. **默认 Props** — 使用解构赋值和默认值（如 `function Card({ title = '默认标题' })`）处理可选 Props。

## 文件说明

| 文件 | 说明 |
|------|------|
| `src/components/NavBar.jsx` | 导航栏组件，接收标题和链接数组作为 Props |
| `src/components/ArticleCard.jsx` | 文章卡片组件，接收 article 数据和 onLike 回调作为 Props |
| `src/components/ArticleList.jsx` | 文章列表组件，管理文章状态并渲染 ArticleCard 列表 |
| `src/components/Footer.jsx` | 页脚组件，接收版权信息作为 Props |
| `src/App.jsx` | 根组件，组合 NavBar、ArticleList、Footer |

## 运行方法

```bash
cd 36-blog-props
# 将代码复制到 33-blog-project 的 src 目录中
npm install && npm run dev
```

## 前后章节依赖关系

- **前序章节**：`35-blog-usestate` — 提供状态管理基础，本章将其封装到子组件中
- **后续章节**：`37-blog-router` — 在本章组件结构基础上添加 React Router 路由切换
