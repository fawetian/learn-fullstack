# 13-components - React 组件

> 来源: https://www.runoob.com/react/react-components.html

## 核心概念

1. **组件是什么**：React 应用由独立的、可复用的组件组成，组件是 UI 的构建块。
2. **函数组件**：接收 `props` 并返回 JSX 的纯函数，简洁、无状态（配合 Hooks 可以有状态）。
3. **类组件**：继承 `React.Component`，通过 `render()` 返回 JSX，可使用生命周期方法和 state。
4. **Props**：父组件向子组件传递数据的对象，**只读**（子组件不应修改 props）。
5. **Props 解构**：使用 `function Comp({ name })` 直接解构 props，代码更简洁。
6. **Props 默认值**：解构时设置默认值，如 `function Button({ text = "Submit" })`。
7. **Props.children**：组件标签体中传入的内容，通过 `props.children` 访问，实现"插槽"效果。
8. **组件树**：组件可以嵌套使用，形成树状结构（App → Header → Logo）。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **整合所有短片段的可运行示例**（推荐） | 直接用浏览器打开 |
| `example_1.js` | 最简单的函数组件 | 已整合到 index.html |
| `example_2.js` | 组件树结构示意（文本图） | 概念说明，无代码运行 |
| `example_3.js` | 函数组件三种写法 | 已整合到 index.html |
| `example_4.js` | 类组件基础写法 | 需构建工具或 CDN |
| `example_5.js` | 无 props 的基础函数组件 | 已整合到 index.html |
| `example_6.js` | 无 props 的基础类组件 | 已整合到 index.html |
| `example_7.js` | 父组件向子组件传递 props | 已整合到 index.html |
| `example_8.js` | 解构 props 与默认值 | 已整合到 index.html |
| `example_9.js` | 多种类型 props（字符串、数组、函数等） | 已整合到 index.html |
| `example_10.js` | props.children 插槽用法 | 已整合到 index.html |
| `example_11.js` ~ `example_31.js` | 其他教程示例 | 参考源码 |

## 运行方法

```bash
cd 13-components
open index.html   # macOS
start index.html  # Windows
```

## 关键知识点总结

- 函数组件优先：React 官方推荐函数组件 + Hooks 模式，类组件在 legacy 项目中仍常见。
- Props 是单向数据流：数据只能由父组件流向子组件，保证可预测性。
- 组件命名必须大写：React 以此区分自定义组件和原生 HTML 标签。
- 不要直接修改 props：props 是只读的，需要修改时应通过 state 或回调函数通知父组件。
