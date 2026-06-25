# 18-lists-keys - React 列表渲染和 Keys

> 来源: https://www.runoob.com/react/react-lists-and-keys.html

## 核心概念

1. **列表渲染**：使用 JavaScript 的 `map()` 方法将数组转换为 JSX 元素列表。
2. **Key 的作用**：帮助 React 识别哪些元素改变了、添加了或删除了。Key 给 React 提供了 Diff 算法的标识依据。
3. **Key 的最佳实践**：使用列表项中稳定且唯一的标识（如数据库 id）。
4. **避免使用 index 作为 key**：如果列表顺序会变化，使用 index 会导致性能问题和组件状态错误。
5. **Key 的位置**：Key 必须放在 `map()` 方法返回的元素上，而不是子组件内部。
6. **Key 不会作为 props 传递**：Key 是 React 内部使用的特殊属性，在子组件中无法通过 `props.key` 读取。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **整合所有示例的可运行页面** | 直接用浏览器打开 |
| `example_1.js` | 基础列表渲染（map + key） | 已整合到 index.html |
| `example_2.js` | 使用对象 id 作为 key | 已整合到 index.html |
| `example_3.js` | 使用 index 作为 key（不推荐） | 已整合到 index.html |
| `example_4.js` | 错误示范：key 写在子组件内部 | 已整合到 index.html |
| `example_5.js` | 传递 key 和 props 给子组件 | 已整合到 index.html |
| `example_6.js` | 正确的 key 位置（在 map 调用处） | 已整合到 index.html |
| `example_7.js` | 在 JSX 中使用逗号表达式赋值 | 已整合到 index.html |
| `example_8.js` | 其他示例 | 参考源码 |

## 运行方法

```bash
cd 18-lists-keys
open index.html
```

## 关键知识点总结

- Key 只在兄弟元素之间需要唯一，不需要全局唯一。
- 不要用 `Math.random()` 作为 key，这会导致组件每次渲染都被重新创建。
- 如果列表项没有稳定 id，且列表不会重新排序、过滤或插入，可以使用 index；否则建议生成唯一 id。
- 在 JSX 的 `{}` 中不能直接使用 `let`/`const`/`var`，如需赋值可使用逗号表达式（但通常建议在 render 外或 map 外处理好数据）。
