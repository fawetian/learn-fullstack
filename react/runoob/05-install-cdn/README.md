# 05-install-cdn: 通过 CDN 使用 React

来源: https://www.runoob.com/react/react-install-cdn.html

## 核心概念

1. **CDN 引入** — 通过 `<script>` 标签从内容分发网络加载 React，无需 npm 或构建工具，适合快速原型和简单页面。
2. **Babel Standalone** — CDN 方式下需引入 Babel 在浏览器中实时编译 JSX，性能较差，仅用于学习演示。
3. **全局变量** — CDN 加载后 React 和 ReactDOM 挂载到 window 全局对象，通过 `React.createElement` 等 API 使用。
4. **生产环境不推荐** — CDN 方式缺乏代码压缩、Tree Shaking、TypeScript 支持等优化，仅适合学习和小型演示。
5. **UMD 构建** — React 提供 UMD 格式的构建文件（react.development.js），兼容 AMD、CommonJS 和全局变量方式。

## 文件说明

| 文件 | 说明 |
|------|------|
| `example_1.js` | CDN 引入 React 的 HTML 脚本标签示例 |

## 运行/学习方法

本章是环境配置章节，展示无需构建工具的 React 使用方式。适合在 HTML 文件中快速测试 React 代码：

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

对于实际项目，强烈建议使用 `04-install-vite` 的 Vite 方式。
