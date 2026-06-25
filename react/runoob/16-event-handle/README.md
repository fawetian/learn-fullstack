# 16-event-handle - React 事件处理

> 来源: https://www.runoob.com/react/react-event-handle.html

## 核心概念

1. **命名规则**：React 事件使用小驼峰命名（`onClick`），而非 HTML 的全小写（`onclick`）。
2. **传入函数引用**：React 事件传入函数引用，而非字符串（`onClick={activateLasers}`）。
3. **阻止默认行为**：不能通过 `return false` 阻止默认行为，必须显式调用 `e.preventDefault()`。
4. **this 绑定**：类组件方法中的 `this` 默认不指向组件实例，需要通过构造器 `bind`、箭头函数或类属性箭头函数来解决。
5. **传递参数**：使用 `bind(this, arg)` 或箭头函数 `(e) => handler(id, e)` 向事件处理函数传参。
6. **性能考虑**：在构造器中 `bind` 或使用类属性箭头函数，不会在每次渲染时创建新函数，避免子组件不必要的重渲染。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **整合所有示例的可运行页面** | 直接用浏览器打开 |
| `example_1.js` | HTML 原生 onclick（对比） | 已整合到 index.html |
| `example_2.js` | React onClick 正确写法 | 已整合到 index.html |
| `example_3.js` | HTML 原生 return false 阻止默认 | 已整合到 index.html |
| `example_4.js` | 箭头函数与 bind 传参 | 已整合到 index.html |
| `example_5.js` | bind 多参数 + event 对象 | 已整合到 index.html |
| `example_6.js` | bind 传参示例（日志版） | 参考源码 |
| `example_7.js` | 完整 LikeButton 组件 | 已整合到 index.html |
| `example_8.js` | 其他示例 | 参考源码 |
| `example_9.js` | JSX 内 bind(this) | 已整合到 index.html |
| `example_10.js` | 箭头函数调用方法 | 已整合到 index.html |
| `example_11.js` | 构造器 bind(this) | 已整合到 index.html |
| `example_12.js` | 构造器 bind(this, 参数) | 已整合到 index.html |
| `example_13.js` | 箭头函数作为类属性（推荐） | 已整合到 index.html |
| `example_14.js` | 箭头传参错误示范 | 已整合到 index.html |
| `example_15.js` | 箭头包裹无参方法 | 已整合到 index.html |
| `example_16.js` | 箭头包裹传参方法 | 已整合到 index.html |
| `example_17.js` | 其他示例 | 参考源码 |

## 运行方法

```bash
cd 16-event-handle
open index.html
```

## 关键知识点总结

- React 事件是合成事件（SyntheticEvent），兼容所有浏览器，且事件对象会被复用（异步访问需调用 `e.persist()`）。
- 类组件绑定 this 的 4 种方案：
  1. 构造器 `this.handleClick = this.handleClick.bind(this)`（推荐，性能最好）
  2. 类属性箭头函数 `handleClick = () => { ... }`（推荐，语法简洁）
  3. JSX 中 `onClick={this.handleClick.bind(this)}`（不推荐，每次渲染创建新函数）
  4. JSX 中 `onClick={() => this.handleClick()}`（不推荐，每次渲染创建新函数）
- 需要传参时：使用 `onClick={() => this.handleClick(id)}` 或 `onClick={this.handleClick.bind(this, id)}`。
