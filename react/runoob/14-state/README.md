# 14-state - React 组件状态

> 来源: https://www.runoob.com/react/react-state.html

## 核心概念

1. **State（状态）**：组件的本地数据存储，驱动 UI 更新。当 state 改变时，React 会自动重新渲染组件。
2. **setState**：修改 state 的唯一正确方式，它会触发重新渲染。永远不要直接赋值 `this.state.xxx = yyy`。
3. **this 绑定问题**：在类组件中，普通函数内的 `this` 可能指向 `window` 或 `undefined`（严格模式），需要通过 `bind(this)`、箭头函数或变量保存来解决。
4. **生命周期**：`componentDidMount` 在组件挂载后执行，`componentWillUnmount` 在卸载前执行，常用于启动/清除定时器、订阅等副作用。
5. **函数式更新**：`setState((prevState) => ({ ... }))` 使用上一次的状态计算新状态，避免异步更新带来的问题。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **整合所有示例的可运行页面** | 直接用浏览器打开 |
| `example_1.js` | 箭头函数基础语法（ES6） | 已整合到 index.html |
| `example_2.js` | 箭头函数多种形式 | 已整合到 index.html |
| `example_3.js` | setInterval 中 this 指向错误（错误示范） | 已整合到 index.html |
| `example_4.js` | 使用 that 保存 this（传统方案） | 已整合到 index.html |
| `example_5.js` | 普通函数内 this 指向 window（错误示范） | 已整合到 index.html |
| `example_6.js` | 完整时钟组件（演示 this 绑定与生命周期） | 已整合到 index.html |
| `example_7.js` | 其他示例 | 参考源码 |

## 运行方法

```bash
cd 14-state
open index.html
```

## 关键知识点总结

- 函数组件使用 `useState` Hook 管理状态；类组件使用 `this.state` 和 `this.setState`。
- `setState` 是异步的，React 可能合并多个 setState 调用以提高性能。
- 需要基于前一个状态更新时，务必使用函数式更新：`setState(prevState => ({ count: prevState.count + 1 }))`。
- 箭头函数没有自己的 `this`，它会继承外层作用域的 `this`，因此在事件处理中推荐优先使用箭头函数。
