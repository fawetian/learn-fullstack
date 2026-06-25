# 19-component-api: React 组件 API

来源: https://www.runoob.com/react/react-component-api.html

## 核心概念

1. **setState()** — 类组件中更新状态的方法，可以是对象或函数式更新（`setState(prev => newState)`），异步合并更新。
2. **forceUpdate()** — 强制组件重新渲染（不推荐），会跳过 shouldComponentUpdate 检查，仅在特殊场景使用。
3. **findDOMNode()** — 获取组件对应的 DOM 节点（已弃用），现代 React 推荐使用 `ref` 直接访问 DOM。
4. **ReactDOM.createPortal()** — 将子组件渲染到 DOM 树的其他位置（如模态框），保持事件冒泡和 Context 传递。
5. **类组件与函数组件** — 现代 React 推荐函数组件 + Hooks（useState/useEffect），类组件 API 主要用于维护老代码。

## 文件说明

| 文件 | 说明 |
|------|------|
| `example_4.js` | setState 示例 |
| `example_5.js` | forceUpdate 示例 |
| `example_6.js` | findDOMNode 示例 |
| `example_7.js` | createPortal 示例 |
| `example_8.js` | 组件 API 综合示例 |
| `example_9.js` | 函数式 setState 示例 |

## 运行/学习方法

本章是类组件 API 参考章节。现代 React 开发以函数组件和 Hooks 为主，但理解类组件 API 有助于：

1. 维护老旧的 React 代码库
2. 深入理解 React 的更新机制（如 setState 的异步合并特性）
3. 阅读基于类组件的第三方库源码

建议阅读示例文件了解概念，实际开发优先使用 `30-hooks` 章节的函数组件写法。
