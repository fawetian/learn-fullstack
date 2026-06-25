# 24-conditional: 条件渲染

来源: https://www.runoob.com/react/react-conditional-rendering.html

## 核心概念

1. **if 条件渲染** — 在组件函数中使用 `if` 提前返回不同的 JSX，实现根据条件展示不同 UI。
2. **三元运算符** — `{condition ? <A /> : <B />}` 是 JSX 中最常用的内联条件渲染方式，简洁直观。
3. **逻辑与运算符** — `{condition && <A />}` 在条件为真时渲染元素，为假时不渲染（注意：0 会被渲染，应使用 `!!` 或 `Boolean()`）。
4. **阻止渲染** — 返回 `null` 可以阻止组件渲染，但组件的生命周期方法仍会执行（如 useEffect）。
5. **多分支渲染** — 复杂条件建议使用对象映射（`{ status: { loading: <Spinner />, error: <Error /> }[status] }`）或抽离为独立组件。

## 文件说明

本章无代码文件，主要讲解条件渲染的不同写法。

## 运行/学习方法

本章是 JSX 核心语法章节。在 `17-conditional-rendering` 中有更详细的条件渲染代码示例，建议结合学习。

练习方法：打开 `34-blog-jsx` 或 `38-blog-useeffect` 的 ArticleList 组件，尝试将 `loading` 和 `error` 的状态判断改写为不同的条件渲染方式（if/三元/逻辑与）。

```jsx
// 三种方式对比
// 方式1：if 提前返回
if (loading) return <Spinner />

// 方式2：三元运算符
{error ? <Error message={error} /> : <List />}

// 方式3：逻辑与
{articles.length === 0 && <Empty />}
```
