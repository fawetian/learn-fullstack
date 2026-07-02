/**
 * 来源: 11-rendering/example_2.jsx —— 渲染一个 React 元素
 */
import ReactDOM from 'react-dom/client';

// 创建一个 React 元素
const element = <h1>Hello, world!</h1>;

export function mount(container) {
  const root = ReactDOM.createRoot(container);
  root.render(element);
  return () => root.unmount();
}

export const title = '渲染一个 React 元素';
export const note = 'const element = <h1>…</h1> 等价于 React.createElement 调用';
