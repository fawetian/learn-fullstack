# 26-memo - React.memo 优化

> 来源: https://www.runoob.com/react/react-memo.html

## 核心概念

1. **React.memo**：高阶组件（HOC），用于优化函数组件。对组件的 props 进行浅比较，如果 props 未变化则跳过重新渲染，直接复用上次渲染结果。
2. **浅比较**：只比较 props 的第一层属性值（引用地址），对于对象和数组，即使内容相同但引用不同，也会触发重渲染。
3. **自定义比较函数**：`React.memo(Component, areEqual)`，第二个参数是一个函数，返回 `true` 表示相等（不渲染），`false` 表示不等（渲染）。
4. **适用场景**：
   - 纯展示组件（接收 props 只负责渲染，无内部状态）
   - 组件渲染开销大，且经常接收相同 props
   - 父组件频繁更新，但子组件 props 不变
5. **不适用场景**：组件内部使用了 state、context 或副作用，且需要响应这些变化时。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **完整 React.memo 可运行示例**（对比普通组件和 memo 组件） | 直接用浏览器打开 |
| `example_1.js` | 自定义比较函数 areEqual 模板 | 已整合到 index.html |
| `example_2.js` | 其他示例 | 参考源码 |

## 运行方法

```bash
cd 26-memo
open index.html
```

## 关键知识点总结

- React.memo 类似于类组件的 `PureComponent`，都是浅比较 props 来决定是否重渲染。
- 如果 props 包含函数，每次父组件渲染都会创建新的函数引用，导致 memo 失效。此时应使用 `useCallback` 缓存函数引用。
- 如果 props 包含对象/数组，每次父组件渲染都会创建新的引用，导致 memo 失效。此时应使用 `useMemo` 缓存对象/数组引用。
- React.memo 是性能优化手段，不是功能需求。在性能不是瓶颈时，不要过早优化。
- 对于使用 `useState`、`useReducer` 或 `useContext` 的组件，即使包裹了 React.memo，内部状态变化仍会触发重渲染。
