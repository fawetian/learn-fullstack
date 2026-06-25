# 21-ajax - React AJAX 数据请求

> 来源: https://www.runoob.com/react/react-ajax.html

## 核心概念

1. **AJAX 时机**：在 `componentDidMount` 生命周期中发起数据请求，因为此时组件已挂载到 DOM，操作 DOM 或请求数据安全。
2. **this 绑定问题**：AJAX 回调函数内的 `this` 可能改变，需要通过 `var that = this`、箭头函数或 `.bind(this)` 来正确访问组件实例。
3. **请求清理**：在 `componentWillUnmount` 中中止未完成的请求，防止组件卸载后调用 `setState` 导致内存泄漏和警告。
4. **状态更新**：通过 `setState` 将请求结果保存到组件状态中，React 会自动重新渲染 UI。
5. **现代 API**：推荐使用原生 `fetch` API 或 `axios`，比 jQuery 更轻量、更现代。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **整合所有示例的可运行页面**（需联网加载 jQuery 和 React CDN） | 直接用浏览器打开 |
| `example_1.js` | jQuery AJAX + 传统 this 绑定（that 变量） | 已整合到 index.html |
| `example_2.js` | jQuery AJAX + 箭头函数绑定 | 已整合到 index.html |
| `example_3.js` | jQuery AJAX + 列表数据渲染 | 已整合到 index.html |
| `example_4.js` | 完整内联 AJAX（babel 编译） | 已整合到 index.html |
| `example_5.js` | fetch API（现代推荐写法） | 已整合到 index.html |
| `example_6.js` | 其他示例 | 参考源码 |

## 运行方法

```bash
cd 21-ajax
open index.html
```

> 注意：需要联网加载 jQuery 和 React CDN 资源。

## 关键知识点总结

- **数据请求最佳实践**：在 `componentDidMount` 中发起，在 `componentWillUnmount` 中清理。
- **箭头函数的优势**：在回调中自动绑定外层 `this`，代码更简洁，无需 `that = this` 或 `.bind(this)`。
- **fetch API**：原生 Promise-based API，无需额外库，现代浏览器均支持。配合 `async/await` 可读性更佳。
- **错误处理**：生产环境务必添加 `.catch()` 或 `try/catch` 处理网络异常。
- **函数组件中的 AJAX**：使用 `useEffect` Hook 替代 `componentDidMount`/`componentWillUnmount`，在 Effect 的清理函数中取消请求（如 AbortController）。
