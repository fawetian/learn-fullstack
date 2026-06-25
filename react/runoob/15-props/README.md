# 15-props - React Props 传递

> 来源: https://www.runoob.com/react/react-props.html

## 核心概念

1. **Props 定义**：Props（Properties 的缩写）是父组件向子组件传递数据的对象，是 React 组件间通信的主要方式。
2. **Props 是只读的**：子组件不能修改传入的 props，保证数据流的单向性和可预测性。
3. **Props 重命名**：父组件传入的 prop 名可以和子组件接收时的名称不同（如 `<Name title={this.props.name} />`）。
4. **Props 传递回调**：父组件通过 props 传入函数，子组件调用该函数即可"通知"父组件，实现子→父通信。
5. **双向数据绑定**：父组件的 state 通过 props 传给子组件作为 `value`，子组件通过 `onChange` 回调修改父组件 state，形成闭环。
6. **PropTypes**：运行时类型检查工具，开发阶段帮助捕获 props 类型错误。

## 文件说明

| 文件 | 说明 | 运行方式 |
|------|------|----------|
| `index.html` | **整合所有示例的可运行页面** | 直接用浏览器打开 |
| `example_2.js` | PropTypes CDN 引入 | 概念说明 |
| `example_3.js` | 父传子时重命名 props | 已整合到 index.html |
| `example_4.js` | 展开多个 props | 已整合到 index.html |
| `example_5.js` | 完整父子组件通信（state + callback） | 已整合到 index.html |
| `example_6.js` | 父子双向数据绑定 | 已整合到 index.html |
| `example_7.js` | 其他示例 | 参考源码 |

## 运行方法

```bash
cd 15-props
open index.html
```

## 关键知识点总结

- 单向数据流：数据只能从父组件通过 props 流向子组件，不能反向流动。
- 子组件修改父组件数据：必须通过父组件传入的回调函数（如 `onChange`）来间接修改父组件的 state。
- 受控组件：input 的 value 由 React state 控制，onChange 更新 state，形成受控组件模式。
- `bind(this)`：在类组件中，将方法绑定到组件实例，确保事件处理函数中的 `this` 正确指向组件。
