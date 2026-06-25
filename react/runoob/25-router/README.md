# 25-router - React Router 路由

> 来源: https://www.runoob.com/react/react-router.html

## 核心概念

1. **什么是 React Router**：React Router 是 React 的标准路由库，让单页应用（SPA）实现多页面导航，而不刷新整个浏览器页面。
2. **BrowserRouter**：使用 HTML5 History API（pushState/popState）实现 URL 和 UI 的同步。
3. **Routes & Route**：`Routes`（v6 替代 v5 的 `Switch`）只渲染第一个匹配的 `Route`；`Route` 通过 `path` 和 `element` 定义路由规则。
4. **Link**：`<Link to="/path">` 渲染为 `<a>` 标签，但使用客户端路由导航，不会刷新页面。
5. **URL 参数**：`:id` 形式的动态路由参数，通过 `useParams()` 获取。
6. **编程式导航**：`useNavigate()` 返回 navigate 函数，实现代码层面的路由跳转（如表单提交后跳转）。
7. **嵌套路由**：React Router v6 支持嵌套 `Route` 和 `<Outlet />`，实现布局共享。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **完整 React Router v6 可运行示例**（CDN 版） | 直接用浏览器打开 |

## 运行方法

```bash
cd 25-router
open index.html
```

## 关键知识点总结

- **React Router v6 重大变化**：
  - `Switch` → `Routes`
  - `component` / `render` prop → `element` prop（传入 JSX 组件）
  - `useHistory` → `useNavigate`
  - 所有路由都是精确匹配（默认 exact），不再支持 `exact` 属性。
- **路由模式**：`BrowserRouter`（推荐，URL 美观）和 `HashRouter`（兼容老旧服务器，带 `#`）。
- **懒加载**：使用 `React.lazy()` + `Suspense` 实现路由级代码分割，减少首屏加载时间。
- **受保护路由**：通过自定义组件包裹 Route 元素，检查权限后决定是否渲染目标页面或重定向到登录页。
- **Router 不能放在 SSR 中直接渲染**：服务端渲染需要使用 `StaticRouter`。
