/**
 * DemoRunner —— 把「原本直接操作 DOM 的 example」安全地跑在 SPA 里。
 * ------------------------------------------------------------
 * 背景：原 example_*.jsx 是「独立脚本」，末尾通常有
 *     ReactDOM.createRoot(document.getElementById("root")).render(...)
 * 直接跑会跟本 SPA 的 main.jsx 抢同一个 #root，而且 setInterval 无人清理。
 *
 * 思路：每个 demo 改造成导出一个 mount(container) 函数 ——
 *   container 是我们提供的真实 <div>，demo 内部的 createRoot 往这里渲染。
 *   返回一个 cleanup 函数（用来清定时器/取消订阅）。
 *   DemoRunner 在 useEffect 里调用 mount，组件卸载时调用 cleanup。
 *
 * 类比 Go：相当于给每段示例代码套一个「请求作用域」，
 *   请求结束（组件卸载）时统一 defer cleanup，避免泄漏。
 */
import { useEffect, useRef, useState } from 'react';
import './DemoRunner.css';

export default function DemoRunner({ demo, title }) {
  const containerRef = useRef(null);   // 真正承载 demo 渲染的容器
  const [error, setError] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !demo) return;

    setError(null);
    let cleanup = () => {};

    try {
      // demo.mount 负责把内容渲染进 container，并返回清理函数
      cleanup = demo.mount(container) || (() => {});
    } catch (e) {
      console.error(`[DemoRunner] 渲染 ${title} 出错:`, e);
      setError(e.message || String(e));
    }

    // 组件卸载或切换 demo 时，清理上一个 demo 的副作用（定时器等）。
    // 用 setTimeout 推迟一帧，避免「synchronously unmount while React rendering」。
    return () => {
      setTimeout(() => {
        try { cleanup(); } catch (e) { console.warn(`[DemoRunner] 清理 ${title} 出错:`, e); }
        if (container) container.innerHTML = '';
      }, 0);
    };
  }, [demo, title]);

  return (
    <div className="demo-runner">
      {error ? (
        <div className="demo-error">⚠️ 此 demo 运行出错：{error}</div>
      ) : (
        // demo 的内容会被渲染进这个 div
        <div ref={containerRef} className="demo-container" />
      )}
    </div>
  );
}
