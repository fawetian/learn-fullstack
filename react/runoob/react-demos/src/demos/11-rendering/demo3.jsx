/**
 * 来源: 11-rendering/example_3.jsx —— 每 1 秒刷新时间（无组件版）
 * ------------------------------------------------------------
 * 改造重点: 原文用 setInterval(tick, 1000) 持续 render。
 *   mount 里记录 timer id，cleanup 时 clearInterval，避免切走后定时器还在跑。
 */
import ReactDOM from 'react-dom/client';

export function mount(container) {
  const root = ReactDOM.createRoot(container);

  function tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    root.render(element);
  }

  tick();                      // 先渲染一次，避免空白
  const timer = setInterval(tick, 1000);

  return () => {
    clearInterval(timer);
    root.unmount();
  };
}

export const title = '定时刷新（无组件）';
export const note = 'setInterval 每 1 秒重新 render —— 理解「渲染」就是重新生成元素树';
