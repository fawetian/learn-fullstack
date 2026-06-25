# 29-tailwind: React 中使用 Tailwind CSS

来源: https://www.runoob.com/react/react-tailwind-css.html

## 核心概念

1. **Tailwind CSS** — 原子化 CSS 框架，提供大量实用类（如 `flex`、`text-center`、`bg-blue-500`），直接在 HTML/JSX 中组合构建 UI，无需编写自定义 CSS。
2. **Utility-First** — 优先使用框架提供的原子类，而不是写自定义 CSS，开发速度快，设计一致性高。
3. **Vite 配置** — 通过 PostCSS 插件集成 Tailwind，在 `tailwind.config.js` 中自定义主题、颜色和断点。
4. **JIT 模式** — 按需生成 CSS，只打包使用到的类，生产构建体积极小（通常几 KB）。
5. **Responsive 与 Dark Mode** — 通过前缀实现响应式（`md:flex`）和深色模式（`dark:bg-black`），无需额外媒体查询。

## 文件说明

| 文件 | 说明 |
|------|------|
| `example_2.sh` | Tailwind 安装命令 |
| `example_3.js` | Tailwind 配置文件示例 |
| `example_4.js` | 在 main.jsx 中导入 Tailwind |

## 运行/学习方法

本章是样式工具配置章节。在博客项目中使用 Tailwind：

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

配置 `tailwind.config.js` 的 `content` 路径指向你的 JSX 文件，然后：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind 非常适合快速构建博客项目的 UI，无需管理大量 CSS 文件。
