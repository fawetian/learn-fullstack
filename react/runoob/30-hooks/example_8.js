useImperativeHandle(ref, () => ({
  // 暴露的方法
}));
useLayoutEffect - 与 useEffect 类似，但它在所有的 DOM 变更之后同步执行。这在需要读取 DOM 布局并同步触发重渲染时非常有用。

useLayoutEffect(() => {
  // 副作用操作
}, [dependencies]);