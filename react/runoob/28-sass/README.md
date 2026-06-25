# 28-sass: React 中使用 Sass

来源: https://www.runoob.com/react/react-sass.html

## 核心概念

1. **Sass/SCSS** — CSS 预处理器，支持变量、嵌套、混合（Mixin）、继承等特性，提升 CSS 的可维护性和复用性。
2. **Vite 内置支持** — Vite 原生支持 Sass/SCSS，只需安装 `sass` 包即可，无需额外配置 loader。
3. **变量与主题** — 使用 `$primary-color: #1890ff` 定义变量，便于统一修改主题色和实现深色模式切换。
4. **嵌套语法** — `.parent { .child { ... } }` 嵌套写法让选择器关系更直观，但应避免过度嵌套（建议不超过 3 层）。
5. **混合与函数** — `@mixin` 定义可复用的样式块，`@include` 调用，`@function` 返回计算值，提高代码复用率。

## 文件说明

本章无代码文件，主要讲解在 React 中配置和使用 Sass。

## 运行/学习方法

本章是样式工具配置章节。在博客项目中使用 Sass：

```bash
npm install -D sass
```

然后创建 `src/styles/main.scss` 并在 `main.jsx` 中导入：

```jsx
import './styles/main.scss'
```

博客项目中的样式建议：
- 定义 `_variables.scss` 存放颜色和字体变量
- 定义 `_mixins.scss` 存放常用 Mixin（如响应式断点）
- 每个组件目录可包含 `.scss` 文件（如 `ArticleCard.scss`）
