# 22-forms-events - React 表单与事件

> 来源: https://www.runoob.com/react/react-forms-events.html

## 核心概念

1. **受控组件**：表单元素（input, textarea, select）的 value 由 React state 控制，onChange 事件更新 state，形成数据闭环。
2. **非受控组件**：使用 ref 直接访问 DOM 元素获取值，不通过 state 管理（类似传统 HTML 表单）。
3. **父子组件表单**：父组件管理 state，通过 props 将 `value` 和 `onChange` 回调传递给子组件，子组件成为受控组件。
4. **事件对象**：React 事件是合成事件（SyntheticEvent），`event.target` 指向触发事件的 DOM 元素，`event.target.value` 获取输入值。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **整合所有示例的可运行页面** | 直接用浏览器打开 |
| `example_1.js` | 受控组件与父子双向数据绑定 | 已整合到 index.html |
| `example_2.js` | 其他示例 | 参考源码 |

## 运行方法

```bash
cd 22-forms-events
open index.html
```

## 关键知识点总结

- **受控组件 vs 非受控组件**：受控组件由 React state 控制，数据流清晰，便于验证和联动；非受控组件通过 ref 操作，代码简单但控制力弱。
- **表单最佳实践**：推荐使用受控组件，尤其是需要实时验证、联动或提交前处理的场景。
- **处理多个 input**：可以给每个 input 设置 `name` 属性，在事件处理函数中通过 `event.target.name` 动态更新对应 state。
- **React 中的 select**：与 HTML 不同，React 在 select 上设置 `value` 属性，而不是 option 的 `selected`。
- **Hooks 中的表单**：函数组件使用 `useState` 管理表单数据，逻辑与类组件完全一致。
