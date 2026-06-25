# 31-reference: React 参考手册

来源: https://www.runoob.com/react/react-reference.html

## 核心概念

1. **React 核心 API** — `createElement`、`createContext`、`createRef`、`forwardRef`、`lazy`、`Suspense` 等核心 API 的速查手册。
2. **Hooks API** — `useState`、`useEffect`、`useContext`、`useReducer`、`useMemo`、`useCallback`、`useRef`、`useLayoutEffect` 等 Hooks 的签名和用法。
3. **类组件 API** — `Component`、`PureComponent` 的生命周期方法列表和属性说明。
4. **DOM 操作** — `createPortal`、`flushSync`、`unstable_batchedUpdates` 等高级 DOM 和渲染 API。
5. **TypeScript 类型** — React 提供的 TS 类型定义（`React.FC`、`React.ReactNode`、`React.CSSProperties` 等），TS 项目开发必备。

## 文件说明

本章无代码文件，是 React API 的参考速查章节。

## 运行/学习方法

本章是查阅参考手册，无需运行代码。建议收藏对应网页，在开发中遇到不确定的 API 时快速查阅。

常用查询场景：
- 不确定 `useEffect` 依赖数组如何写 → 查阅 `useEffect` 文档
- 需要创建全局状态 → 查阅 `createContext` + `useContext`
- 需要懒加载组件 → 查阅 `React.lazy` + `Suspense`
- 需要获取子组件 DOM → 查阅 `forwardRef` + `useImperativeHandle`
