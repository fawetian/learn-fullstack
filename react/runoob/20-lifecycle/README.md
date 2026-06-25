# 20-lifecycle: React 组件生命周期

来源: https://www.runoob.com/react/react-lifecycle.html

## 核心概念

1. **挂载阶段** — 组件从创建到插入 DOM 的过程：`constructor` → `render` → `componentDidMount`（常用作初始化数据请求）。
2. **更新阶段** — 状态或 Props 变化时触发：`render` → `componentDidUpdate`（可在此处理副作用或对比前后状态）。
3. **卸载阶段** — 组件从 DOM 中移除：`componentWillUnmount`（常用作清理：取消请求、移除定时器、解绑事件）。
4. **函数组件生命周期** — `useEffect` Hook 涵盖了类组件三个生命周期的作用：`[]` 对应 mount，依赖变化对应 update，返回函数对应 unmount。
5. **React 18 的 Effect 变化** — 开发模式下 StrictMode 会故意双重调用 mount 的 effect，帮助检测副作用清理是否完善。

## 文件说明

本章无代码文件，主要讲解生命周期概念和图示。

## 运行/学习方法

本章是原理概念章节，理解生命周期对管理副作用至关重要。学习建议：

1. 在纸上画出类组件的三个生命周期阶段和对应方法
2. 将类组件生命周期映射到函数组件的 `useEffect`（`30-hooks` 章节）
3. 在 `38-blog-useeffect` 博客章节中实践 useEffect 的挂载、更新和清理逻辑

核心对比：
- 类组件：`componentDidMount` + `componentDidUpdate` + `componentWillUnmount` → `useEffect`
- 函数组件更简洁，一个 `useEffect` 就能管理完整的生命周期副作用
