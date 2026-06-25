# 17-conditional-rendering - React 条件渲染

> 来源: https://www.runoob.com/react/react-conditional-rendering.html

## 核心概念

1. **条件渲染**：根据组件的 state 或 props 决定渲染什么 UI，是 React 的核心能力之一。
2. **if/else 渲染**：在 render 方法或函数组件中使用 if/else 返回不同的 JSX。
3. **元素变量**：将 JSX 赋值给变量，根据条件渲染不同变量，避免重复代码。
4. **三元运算符**：`condition ? trueUI : falseUI`，适合简单的内联条件渲染。
5. **逻辑与运算符**：`condition && <Component />`，条件为真时渲染，为假时不渲染（注意 `0 && ...` 的坑）。
6. **阻止渲染**：返回 `null` 可以让组件不渲染任何内容，但不会影响生命周期方法的执行。
7. **函数式 setState**：`setState(prevState => ({ ... }))` 基于上一次状态更新，避免异步问题。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **整合所有示例的可运行页面** | 直接用浏览器打开 |
| `example_1.js` | 条件渲染基础组件 | 已整合到 index.html |
| `example_2.js` | 内联条件表达式（三元运算符） | 已整合到 index.html |
| `example_3.js` | 条件渲染整个组件 | 已整合到 index.html |
| `example_4.js` | 函数式 setState（基于 prevState） | 已整合到 index.html |
| `example_5.js` | 函数式 setState 通用模板 | 已整合到 index.html |
| `example_6.js` | 完整条件切换组件 | 已整合到 index.html |
| `example_7.js` | 其他示例 | 参考源码 |

## 运行方法

```bash
cd 17-conditional-rendering
open index.html
```

## 关键知识点总结

- 条件渲染本质上是 JavaScript 的条件逻辑 + JSX 表达式。
- `&&` 短路求值非常适合条件渲染，但要小心 `0`、`''`、`NaN` 等 falsy 值意外渲染到页面。
- 三元运算符适合二选一，if/else 适合多分支或复杂逻辑。
- 函数式 `setState` 在依赖前一个状态时必须使用，避免多个 setState 调用被合并后状态丢失。
