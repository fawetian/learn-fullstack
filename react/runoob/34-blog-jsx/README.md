# 34-blog-jsx: JSX 渲染文章列表

来源: https://www.runoob.com/react/react-blog-template-syntax.html

## 本章节在博客项目中的角色

本章是博客项目的第一个功能模块。在 `33-blog-project` 项目骨架的基础上，使用 JSX 语法渲染静态文章列表，展示 React 的模板渲染能力。为后续章节引入状态管理（useState）和组件拆分（Props）提供基础 UI。

## 核心概念

1. **JSX 语法** — 在 JavaScript 中编写类 HTML 结构，编译后转换为 `React.createElement` 调用。
2. **花括号表达式** — `{expression}` 在 JSX 中插入 JavaScript 表达式的值，渲染动态内容。
3. **map 列表渲染** — 使用 `array.map()` 将数据数组转换为 JSX 元素数组，实现列表渲染。
4. **className 属性** — JSX 中使用 `className` 代替 HTML 的 `class`，避免与 JavaScript 关键字冲突。
5. **key 属性** — 列表渲染时为每个元素提供唯一 `key`，帮助 React 识别 DOM 变化并高效更新。

## 文件说明

| 文件 | 说明 |
|------|------|
| `src/components/ArticleList.jsx` | 文章列表组件，使用 JSX 渲染静态文章数据 |
| `src/App.jsx` | 根组件，引入并渲染 ArticleList |

## 运行方法

```bash
cd 34-blog-jsx
# 将本章代码复制到 33-blog-project 的 src 目录中覆盖对应文件
# 然后执行：
npm install && npm run dev
```

## 前后章节依赖关系

- **前序章节**：`33-blog-project` — 提供项目骨架和 Vite 环境
- **后续章节**：`35-blog-usestate` — 在本章静态列表基础上添加响应式状态管理
