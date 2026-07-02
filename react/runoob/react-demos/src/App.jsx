/**
 * App.jsx —— 全章节 demo 总导航页
 * 左侧：章节列表 + 每个 demo 条目；右侧：选中 demo 的渲染结果或源码展示。
 * 数据来自 src/manifest.json（由 scripts/convert.mjs 生成）。
 */
import { useState, useEffect } from 'react';
import DemoRunner from './components/DemoRunner';
import './App.css';

import manifest from './manifest.json';

function App() {
  // 默认选中第一个 demo
  const first = manifest[0]?.demos[0];
  const [active, setActive] = useState(first ? { chapter: manifest[0].chapter, file: first.file } : null);
  const [collapsed, setCollapsed] = useState({}); // 章节折叠状态

  const toggle = (ch) => setCollapsed(s => ({ ...s, [ch]: !s[ch] }));

  return (
    <div className="layout">
      {/* 左侧导航 */}
      <aside className="sidebar">
        <h1 className="brand">React Demos <span>· 菜鸟教程</span></h1>
        <p className="brand-sub">164 个可运行示例 · 29 章</p>
        <nav className="tree">
          {manifest.map(ch => (
            <div key={ch.chapter} className="chapter">
              <button className="chapter-head" onClick={() => toggle(ch.chapter)}>
                <span className="arrow">{collapsed[ch.chapter] ? '▶' : '▼'}</span>
                {ch.chapter}
                <span className="ch-title">{ch.title}</span>
              </button>
              {!collapsed[ch.chapter] && (
                <ul className="demo-list">
                  {ch.demos.map(d => {
                    const key = `${ch.chapter}/${d.file}`;
                    const isActive = active && active.chapter === ch.chapter && active.file === d.file;
                    return (
                      <li key={key}>
                        <button
                          className={'demo-item' + (isActive ? ' active' : '') + (d.special ? ' src' : '')}
                          onClick={() => setActive({ chapter: ch.chapter, file: d.file })}
                        >
                          {d.file}
                          {d.special && <span className="tag-src">源码</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* 右侧渲染区 */}
      <main className="main">
        {active ? <ActiveDemo key={`${active.chapter}/${active.file}`} {...active} /> : <p>请选择左侧 demo</p>}
      </main>
    </div>
  );
}

// 真正渲染活跃 demo：动态 import 拿到模块，按 isSourceOnly 分支
function ActiveDemo({ chapter, file }) {
  const [mod, setMod] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    let cancelled = false;
    setMod(null); setErr(null);
    import(`./demos/${chapter}/${file}.jsx`)
      .then(m => { if (!cancelled) setMod(m); })
      .catch(e => { if (!cancelled) setErr(e.message); });
    return () => { cancelled = true; };
  }, [chapter, file]);

  if (err) return <div className="error-box">模块加载失败：{err}</div>;
  if (!mod) return <div className="loading">加载中…</div>;

  if (mod.isSourceOnly) {
    return (
      <div className="source-only">
        <div className="src-banner">⚠️ 此文件为源码展示：{mod.title}</div>
        <pre className="src-code"><code>{mod.sourceCode}</code></pre>
      </div>
    );
  }

  return (
    <div className="demo-wrap">
      <h2 className="demo-title">{mod.title}</h2>
      <p className="demo-meta">来源：{mod.sourceFile} · 形状 {mod.shape}</p>
      <div className="demo-frame">
        <DemoRunner demo={mod} title={mod.title} />
      </div>
      <details className="src-details">
        <summary>查看转换后的 demo 源码</summary>
        <pre className="src-code"><code>{mod.rawCode || '(无)'}</code></pre>
      </details>
    </div>
  );
}

export default App;
