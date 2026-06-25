# 30-hooks - React Hooks

> 来源: https://www.runoob.com/react/react-hooks.html

## 核心概念

1. **Hooks 是什么**：Hooks 是 React 16.8 引入的新特性，允许函数组件使用 state 和生命周期等特性，无需编写类组件。
2. **Hooks 规则**：
   - 只能在函数组件或自定义 Hooks 的顶层调用，不要在循环、条件或嵌套函数中调用。
   - 只能在 React 函数组件或自定义 Hooks 中调用。
3. **useState**：让函数组件拥有状态，返回 `[state, setState]`。
4. **useEffect**：在组件渲染后执行副作用，替代类组件的生命周期方法（componentDidMount、componentDidUpdate、componentWillUnmount）。
5. **useContext**：订阅 React Context，实现跨层级数据传递，无需逐层传递 props。
6. **useReducer**：`useState` 的替代方案，适合复杂状态逻辑，返回 `[state, dispatch]`。
7. **useCallback**：缓存函数引用，避免每次渲染创建新函数，优化子组件（配合 React.memo）。
8. **useMemo**：缓存计算结果，避免每次渲染执行昂贵的计算，或缓存对象/数组引用。
9. **useRef**：返回可变的 ref 对象，`.current` 可保存任何值，变化不会触发重渲染。常用于 DOM 引用和保存上轮值。
10. **useImperativeHandle**：配合 `forwardRef` 自定义暴露给父组件的实例方法，限制父组件对子组件 DOM 的直接操作。
11. **useLayoutEffect**：与 `useEffect` 签名相同，但同步执行（在浏览器绘制前），适合读取 DOM 布局并同步调整，避免闪烁。
12. **useDebugValue**：在 React DevTools 中显示自定义 Hook 的标签，仅用于调试。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **涵盖 10 个核心 Hooks 的完整可运行示例** | 直接用浏览器打开 |
| `example_2.js` | useEffect 模板代码 | 已整合到 index.html |
| `example_4.js` | useReducer 模板代码 | 已整合到 index.html |
| `example_5.js` | useCallback 模板代码 | 已整合到 index.html |
| `example_6.js` | useMemo 模板代码 | 已整合到 index.html |
| `example_8.js` | useImperativeHandle + useLayoutEffect 模板 | 已整合到 index.html |
| `example_1.js` / `example_3.js` / `example_7.js` / `example_9.js` | 其他示例 | 参考源码 |

## 运行方法

```bash
cd 30-hooks
open index.html
```

## 关键知识点总结

- **useEffect 依赖数组**：
  - 无依赖数组：每次渲染后都执行。
  - `[]`（空数组）：只在组件挂载和卸载时执行。
  - `[a, b]`：在挂载时和依赖变化时执行。
- **useEffect 清理函数**：返回的函数在组件卸载或依赖变化前执行，用于清除定时器、订阅、事件监听等。
- **useCallback vs useMemo**：
  - `useCallback` 缓存函数（`useCallback(fn, deps)` 等价于 `useMemo(() => fn, deps)`）。
  - `useMemo` 缓存计算结果/对象/数组。
- **useRef 不是 re-render 的逃生舱**：修改 ref 不会触发重渲染，不要试图用 ref 替代 state 来控制 UI。
- **自定义 Hook**：将组件逻辑提取到可复用的函数中，函数名以 `use` 开头，可以调用其他 Hooks。
- **Hooks 让代码更简洁**：函数组件 + Hooks 可以完全替代类组件，代码更短、逻辑更容易复用和测试。
