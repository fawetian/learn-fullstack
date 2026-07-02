/**
 * 来源: 11-rendering/example_4.jsx —— 把时间封装成 Clock 组件（函数组件版）
 * ------------------------------------------------------------
 * 原文在 tick() 里反复 createRoot，改造为只 createRoot 一次，
 *   tick 里只 root.render，更接近真实用法。
 */
import ReactDOM from 'react-dom/client';

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>现在是 {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
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

export const title = 'Clock 函数组件';
export const note = '把 JSX 抽成可复用的 Clock 函数组件，props.date 由外部传入';
