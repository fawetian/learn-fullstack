# 12-JSX - React JSX 语法演示

> 来源: https://www.runoob.com/react/react-jsx.html

## 核心概念

1. **JSX 是什么**：JSX 是 JavaScript 的语法扩展，允许在 JS 中编写类似 HTML 的代码。它会被 Babel 等编译工具转换为 `React.createElement()` 调用。
2. **JSX 编译原理**：`<h1>Hello</h1>` 实际上编译为 `React.createElement('h1', null, 'Hello')`。
3. **JavaScript 表达式**：在 JSX 中使用 `{}` 包裹任意有效的 JS 表达式（变量、函数调用、计算等）。
4. **属性规则**：使用 `camelCase` 命名（如 `className` 替代 `class`，`htmlFor` 替代 `for`）。
5. **根元素限制**：JSX 只能有一个根元素，多个元素必须用包裹元素或 `<React.Fragment>` / `<>` 包裹。
6. **条件渲染**：可以使用三元运算符 `? :` 或逻辑与 `&&` 进行条件渲染。
7. **列表渲染**：使用 `map()` 遍历数组，必须提供唯一的 `key` 属性（帮助 React 虚拟 DOM 高效更新）。
8. **内联样式**：`style` 属性接收一个 JavaScript 对象，属性名使用 `camelCase`（如 `fontSize`）。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **整合所有短片段的可运行示例**（推荐） | 直接用浏览器打开 |
| `example_4.js` | 自定义组件命名规则（大写开头） | 已整合到 index.html |
| `example_5.js` | React Fragment（空标签 `<>...</>`） | 已整合到 index.html |
| `example_6.js` | JSX 语法规则（className、自闭合标签） | 已整合到 index.html |
| `example_7.js` | JSX 嵌入 JavaScript 表达式 | 已整合到 index.html |
| `example_8.js` | 条件渲染（三元运算符、逻辑与） | 已整合到 index.html |
| `example_9.js` | 列表渲染和 key 属性 | 已整合到 index.html |
| `example_12.js` | CSS Modules 样式导入 | 需构建工具（Vite/Webpack）支持 |
| `example_14.js` | 组件接收 props（解构写法） | 需构建工具支持 CSS Modules |
| `example_15.js` | JSX 注释语法 | 已整合到 index.html |
| `example_16.js` | JSX 必须有根元素（错误示例） | 已整合到 index.html（已修正） |
| `example_17.js` | 使用包裹元素作为根 | 已整合到 index.html |
| `example_18.js` | 错误的内联样式写法 | 已整合到 index.html（已修正） |
| `example_19.js` | 正确的内联样式写法 | 已整合到 index.html |
| `example_10.css` / `example_11.css` / `example_13.css` | 样式文件 | 配合对应 JS 组件使用 |

## 运行方法

### 浏览器直接运行（推荐初学者）
```bash
# 直接用浏览器打开整合示例
cd 12-jsx
open index.html        # macOS
# 或
start index.html       # Windows
# 或
xdg-open index.html    # Linux
```

### 使用 Vite 构建工具（生产环境）
```bash
cd 12-jsx
npm install
npm run dev
```

## 关键知识点总结

- JSX 不是字符串，也不是 HTML，而是 JavaScript 的语法糖。
- 浏览器无法直接执行 JSX，需要通过 Babel 编译为 `React.createElement()`。
- 自定义组件必须以大写字母开头，小写会被当作原生 HTML 标签。
- `key` 属性在列表中至关重要，它帮助 React 识别哪些元素改变了、添加了或删除了。
- Fragment `<>...</>` 不会在 DOM 中生成额外节点，比用 `<div>` 包裹更干净。
- JSX 注释使用 `{ /* 注释 */ }`，不能直接使用 HTML 注释 `<!-- -->`。
