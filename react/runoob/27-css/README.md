# 27-css: React 中使用 CSS

来源: https://www.runoob.com/react/react-css.html

## 核心概念

1. **内联样式** — 通过 `style={{ color: 'red' }}` 传递样式对象，属性名使用驼峰命名（如 `backgroundColor`），适合动态样式。
2. **CSS 类名** — 使用 `className` 属性代替 HTML 的 `class`（JSX 中 `class` 是 JavaScript 保留字），配合外部 CSS 文件使用。
3. **CSS 模块** — 文件名以 `.module.css` 结尾，导入后得到局部作用域的类名（如 `import styles from './Button.module.css'`），避免全局命名冲突。
4. **CSS-in-JS** — 通过 JavaScript 编写 CSS（如 styled-components），实现动态样式、主题切换和样式与组件绑定。
5. **样式优先级** — 内联样式 > CSS 模块/类名 > 全局 CSS，建议优先使用 CSS 模块或类名，内联样式仅用于动态计算的值。

## 文件说明

本章无代码文件，主要讲解在 React 中使用 CSS 的多种方式。

## 运行/学习方法

本章是样式方案说明章节。在博客项目中，建议按以下优先级选择样式方案：

1. **普通 CSS/类名** — 简单项目，样式量少
2. **CSS 模块** — 中大型项目，避免类名冲突
3. **Tailwind CSS** — 参见 `29-tailwind` 章节，快速构建现代 UI
4. **Sass** — 参见 `28-sass` 章节，需要变量、嵌套、混合等高级特性时

博客项目（`33-blog-project`）中可使用任意方式，建议在 `42-blog-deploy` 打包时确保 CSS 被正确提取和压缩。
