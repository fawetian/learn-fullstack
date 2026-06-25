# 23-refs - React Refs 引用

> 来源: https://www.runoob.com/react/react-refs.html

## 核心概念

1. **Ref 是什么**：Ref 提供了一种访问 DOM 节点或在 render 方法中创建的 React 元素的方式。
2. **何时使用 Ref**：
   - 管理焦点、文本选择或媒体播放
   - 触发强制动画
   - 集成第三方 DOM 库
   - 避免滥用：能用 props/state 解决的问题，不要用 ref。
3. **createRef**：`React.createRef()` 创建 ref 对象，挂载后通过 `ref.current` 访问 DOM。
4. **回调 Ref**：`ref={(node) => { this.myRef = node }}`，更灵活，适合需要监听 ref 变化的场景。
5. **函数组件中的 Ref**：函数组件没有实例，需要使用 `useRef` Hook 或 `forwardRef`。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **整合所有示例的可运行页面** | 直接用浏览器打开 |
| `example_1.js` | 创建 Ref 并绑定到 DOM 元素 | 已整合到 index.html |
| `example_2.html` | 使用 Ref 获取焦点（HTML 版） | 已整合到 index.html |
| `example_3.js` | 回调 Ref（callback ref） | 已整合到 index.html |
| `example_4.js` | 其他示例 | 参考源码 |

## 运行方法

```bash
cd 23-refs
open index.html
```

## 关键知识点总结

- **不要过度使用 ref**：Ref 是"逃生舱"，应尽量通过提升 state 和 props 来实现数据流。
- **DOM 操作安全时机**：在 `componentDidMount` 或 `useEffect` 中访问 ref，确保 DOM 已渲染。
- **函数组件使用 useRef**：`const inputRef = useRef(null);` 然后在 JSX 中 `<input ref={inputRef} />`。
- **forwardRef**：将 ref 从父组件转发到子组件内部的 DOM 元素，使用 `React.forwardRef` 实现。
- **ref 与 state 的区别**：修改 ref 不会触发重新渲染，修改 state 会触发重新渲染。
