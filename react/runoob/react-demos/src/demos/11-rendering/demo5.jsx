/**
 * 来源: 11-rendering/example_5.jsx —— Clock 改写为 class 组件
 * ------------------------------------------------------------
 * 对比 demo4: 函数组件 vs class 组件，渲染结果一样。
 *   class 写法是 React 老写法，了解即可；现代代码多用函数组件 + Hooks。
 */
import React from 'react';
import ReactDOM from 'react-dom/client';

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export function mount(container) {
  const root = ReactDOM.createRoot(container);

  function tick() {
    root.render(<Clock date={new Date()} />);
  }

  tick();
  const timer = setInterval(tick, 1000);

  return () => {
    clearInterval(timer);
    root.unmount();
  };
}

export const title = 'Clock class 组件';
export const note = '同一 Clock 改用 class 组件实现 —— class 靠 render() 返回 JSX';
