// convert.mjs —— 把 runoob 各章节的 example_*.jsx 批量转换成 react-demos 可运行 demo
//
// 核心思路（沙箱劫持）:
//   原始 example 代码几乎不动，整体包进 mount(container) 函数。
//   在该函数作用域里「劫持」document.getElementById —— 无论原文找 'root'/'example'/'app'
//   都返回我们传入的真实 container，于是 createRoot/render 就挂到这个容器上。
//   同时提供兼容的 ReactDOM（含旧版 render/unmountComponentAtNode），免改老代码。
//
// 用法: node scripts/convert.mjs
import fs from 'node:fs';
import path from 'node:path';

const RUNOOB = path.resolve(import.meta.dirname, '../..');        // .../react/runoob
const DEMOS_DIR = path.resolve(import.meta.dirname, '../src/demos');
const CHAPTERS = [
  '12-jsx','13-components','14-state','15-props','16-event-handle',
  '17-conditional-rendering','18-lists-keys','19-component-api','20-lifecycle',
  '21-ajax','22-forms-events','23-refs','24-conditional','25-router','26-memo',
  '27-css','28-sass','29-tailwind','30-hooks','31-reference',
  '33-blog-project','34-blog-jsx','35-blog-usestate','36-blog-props','37-blog-router',
  '38-blog-useeffect','39-blog-search','40-blog-custom-hooks','41-blog-context-reducer',
];

// 章节中文标题（用于导航）
const CHAPTER_TITLE = {
  '12-jsx':'JSX 语法','13-components':'组件','14-state':'State 状态','15-props':'Props 属性',
  '16-event-handle':'事件处理','17-conditional-rendering':'条件渲染','18-lists-keys':'列表 & Key',
  '19-component-api':'组件 API','20-lifecycle':'生命周期','21-ajax':'AJAX','22-forms-events':'表单与事件',
  '23-refs':'Refs','24-conditional':'条件渲染 II','25-router':'路由','26-memo':'memo 性能',
  '27-css':'CSS 样式','28-sass':'Sass','29-tailwind':'Tailwind','30-hooks':'Hooks 入门',
  '31-reference':'React 顶层 API 参考','33-blog-project':'博客项目·初始化','34-blog-jsx':'博客·JSX',
  '35-blog-usestate':'博客·useState','36-blog-props':'博客·Props','37-blog-router':'博客·路由',
  '38-blog-useeffect':'博客·useEffect','39-blog-search':'博客·搜索','40-blog-custom-hooks':'博客·自定义 Hook',
  '41-blog-context-reducer':'博客·Context/Reducer',
};

const isComment = (line) => /^\s*(\/\/|\*)/.test(line) || /^\s*\/\*/.test(line);

// 去掉「文件: react/runoob/...」这一行注释，让 title 不被它污染
function extractTitle(code) {
  // 从注释块里找「章节: xxx」
  const m = code.match(/\*\s*章节:\s*(.+)/);
  return m ? m[1].trim() : '';
}

function analyze(code) {
  // 只看非注释行做特征判断
  const lines = code.split('\n').filter(l => !isComment(l)).join('\n');
  const hasCreateRoot = /createRoot\s*\(/.test(lines);
  const hasLegacyRender = /ReactDOM\s*\.\s*render\s*\(/.test(lines);
  const hasExport = /\bexport\s+(default|\{)/.test(lines);
  const hasTimer = /\b(setInterval|setTimeout|requestAnimationFrame)\s*\(/.test(lines);
  const isClass = /\bclass\s+\w+\s+extends\s+/.test(lines);
  const usesHooks = /\buse(State|Effect|Context|Reducer|Callback|Memo|Ref)\s*\(/.test(lines);
  const needsReactDOM = /ReactDOM/.test(lines) || hasCreateRoot || hasLegacyRender;
  let shape;
  if (hasCreateRoot || hasLegacyRender) shape = 'A';
  else if (hasExport) shape = 'B';
  else shape = 'C';
  return { shape, hasCreateRoot, hasLegacyRender, hasExport, hasTimer, isClass, usesHooks, needsReactDOM };
}

// 合法的外部包 import（这些已 npm install，转换时保留，不当跨文件依赖处理）
const ALLOWED_PACKAGES = ['react', 'react-dom', 'react-dom/client', 'react-dom/server',
  'react-router-dom', 'prop-types'];

// 判断是不是「特殊/需源码展示」文件 —— 这些 demo 无法独立运行
function isSpecial(chapter, base, code) {
  if (chapter === '38-blog-useeffect' && base === 'example_2') return '纯 JSON 数据文件，非 React 代码';
  // 31-reference 里几个顶层 API 片段
  if (chapter === '31-reference' && ['example_2','example_4','example_5','example_21'].includes(base))
    return 'React 顶层 API 用法片段（非组件），用源码展示';
  if (chapter === '37-blog-router' && base === 'example_1')
    return '导出的是路由配置对象（createBrowserRouter），非组件';

  // 跨本地文件依赖：import 了 ./ 或 ../ 开头的文件（这些文件在 demo 沙箱里不存在）
  const relImports = [...code.matchAll(/from\s+['"](\.\.?\/[^'"]+)['"]/g)].map(m => m[1]);
  if (relImports.length) {
    return `依赖外部文件（${[...new Set(relImports)].slice(0,3).join(', ')}），属多文件项目片段，无法独立运行`;
  }

  // 已知「引用了未定义组件/API 或原代码有缺陷」的片段（原教程本身就是不完整的示意片段）
  const undefinedRefs = [
    [chapter==='17-conditional-rendering'&&base==='example_1', '引用了未定义的 UserGreeting/GuestGreeting 组件'],
    [chapter==='17-conditional-rendering'&&base==='example_2', '依赖同章 example_1 的 Greeting 组件，且 setState 时序在沙箱内不稳定，属示意片段'],
    [chapter==='36-blog-props'&&base==='example_3', 'CategoryFilter 需父组件传入 categories/onCategoryChange 等 props，单独渲染缺数据'],
    [chapter==='41-blog-context-reducer'&&base==='example_3', '定义的是 Context/Provider/自定义 hook 工具模块（FavoriteProvider 渲染 children，单独无内容）'],
    [chapter==='18-lists-keys'&&base==='example_5', '引用了未定义的 ListItem 组件'],
    [chapter==='15-props'&&base==='example_9', '使用已废弃的 React.createClass，且依赖旧版 PropTypes 写法'],
    [chapter==='19-component-api'&&(['example_2','example_3','example_5'].includes(base)), '原代码 class 组件未初始化 state（render 时 this.state 为 null），属示意片段'],
    [chapter==='20-lifecycle'&&base==='example_1', '原代码挂载到 document.body，与沙箱容器冲突，且属示意片段'],
    [chapter==='21-ajax'&&base==='example_3', '依赖全局 jQuery ($)，且 componentDidMount 用 $.get，无法独立运行'],
    [chapter==='23-refs'&&base==='example_5', '原代码 render 了 <MyComponent/> 但定义的是 ParentComponent（原教程笔误）'],
    [chapter==='31-reference'&&(['example_9','example_10'].includes(base)), '原代码 class 组件未初始化 state，render 时 this.state 为 null'],
    [chapter==='31-reference'&&base==='example_7', '引用了未定义的 subscribeToData 函数'],
    [chapter==='31-reference'&&base==='example_16', '引用了未定义的 computeExpensiveValue 函数'],
    [chapter==='31-reference'&&base==='example_19', '入口脚本，引用了未定义的 App 组件'],
    [chapter==='41-blog-context-reducer'&&base==='example_6', '引用了未定义的 article 变量（示意片段）'],
  ];
  for (const [cond, reason] of undefinedRefs) if (cond) return reason;

  return null;
}

function convert({ chapter, file, code }) {
  const base = file.replace(/\.jsx$/, '');
  const info = analyze(code);
  const chapterTitle = extractTitle(code) || CHAPTER_TITLE[chapter] || chapter;

  // 原始代码正文（去掉顶部注释块 + 所有 import/export）
  const codeBody = stripHeaderComment(code);

  // 从原始 code 提取需要保留到顶层的白名单包 import（如 react-router-dom）
  const extraImports = extractAllowedImports(code);

  // 沙箱 + 清理（形状 A/B/C 共用）：劫持 document.getElementById、提供兼容 ReactDOM
  const sandbox = `  // === 沙箱：让原代码 document.getElementById('root'/'example'/...) 都指向本容器 ===
  const _origGetById = document.getElementById.bind(document);
  document.getElementById = () => container;
  const _roots = [];
  const ReactDOM = {
    createRoot: (el) => { const r = createRoot(el || container); _roots.push(r); return r; },
    render: (elem, el) => { const r = createRoot(el || container); r.render(elem); _roots.push(r); },
    unmountComponentAtNode: () => {},
  };
  // 补上原代码常从 react 解构的符号（它们的 import 已被 cleanCode 清掉）
  const { Component, Fragment, PureComponent, useState, useEffect, useContext,
          useReducer, useCallback, useMemo, useRef, memo, createContext,
          createElement, Children, cloneElement, isValidElement } = React;
  // PropTypes 简易桩：原代码可能用 PropTypes.string 等，运行时不校验，返回 noop 函数
  const PropTypes = new Proxy(function(){}, {
    get: () => new Proxy(function(){}, { get: () => () => {}, set: () => true })
  });
  let _cleanup = () => {};
`;

  const restore = `  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };
`;

  // 形状 A：原代码自己 createRoot + render，原样放进 mount 执行即可
  // 形状 B/C：原代码只定义组件不渲染，需要我们额外挑一个组件渲染出来
  let runner;
  if (info.shape === 'A') {
    runner = `  /* ↓↓↓ 原始 example 代码（原样执行，会自己挂载）↓↓↓ */
${indent(codeBody, 2)}
`;
  } else {
    // 从原代码里提取候选组件名：function Xxx / const Xxx = / class Xxx
    const candidates = extractComponentNames(codeBody);
    const usesRouter = extraImports.some(l => l.includes('react-router-dom'));
    const Wrapper = usesRouter ? 'BrowserRouter' : null;   // Link/Outlet 需 Router 上下文
    const wrap = (inner) => Wrapper
      ? `React.createElement(${Wrapper}, null, ${inner})`
      : inner;
    const renderSnippet = candidates.length
      ? `  /* ↑ 原始代码定义了组件，自动挑「${candidates[0]}」渲染${Wrapper?'（外层包 BrowserRouter 提供 router 上下文）':''} ↓ */
  try {
    const _r = createRoot(container);
    _roots.push(_r);
    _r.render(${wrap(`React.createElement(${candidates[0]})`)});
  } catch(e) { console.error('自动渲染失败:', e); }`
      : `  // （未识别出组件，原代码可能是纯片段，渲染为空）`;
    runner = `  /* ↓↓↓ 原始 example 代码（定义组件）↓↓↓ */
${indent(codeBody, 2)}
${renderSnippet}
`;
  }

  const out = `/**
 * 章节: ${chapterTitle}
 * 来源: ${chapter}/${file}（形状${info.shape} | ${info.isClass?'class':info.usesHooks?'hooks':'函数'}${info.hasTimer?' | 定时器':''}）
 * 由 scripts/convert.mjs 自动生成 —— 可直接编辑本文件调整。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
${extraImports.length ? extraImports.join('\n') + '\n' : ''}
// 把本 demo 渲染进 DemoRunner 提供的容器
export function mount(container) {
${sandbox}
${runner}
${restore}
}

export const title = ${JSON.stringify(`${chapterTitle} · ${base}`)};
export const sourceFile = ${JSON.stringify(`${chapter}/${file}`)};
export const shape = ${JSON.stringify(info.shape)};
export const rawCode = ${JSON.stringify(codeBody)};
`;

  return out;
}

// 去掉顶部注释块 + 所有 import / export 语句（白名单 import 由 convert() 从原始 code 单独提取到顶层）
function stripHeaderComment(code) {
  let c = code.replace(/^\/\*[\s\S]*?\*\/\s*/, '');   // 去顶部注释块
  c = c.replace(/^\s*import\b[^\n]*$/gm, '');          // 删掉所有 import 行
  c = c.replace(/^\s*export\s+default\s+/gm, '');      // export default Counter -> Counter
  c = c.replace(/^\s*export\s+\{[^\n]*\}\s*;?\s*$/gm, '');
  c = c.replace(/^\s*export\s+/gm, '');
  c = c.replace(/\n{3,}/g, '\n\n');
  return c.trim();
}

// 从【原始】code 提取需要保留到顶层的白名单包 import（去重）
function extractAllowedImports(code) {
  const seen = new Set();
  const out = [];
  for (const m of code.matchAll(/^\s*import\b[^\n]*$/gm)) {
    const line = m[0].trim();
    const pkg = (line.match(/from\s+['"]([^'"]+)['"]/) || [])[1];
    // 只保留 react-router-dom（react/react-dom 已由模板固定 import）
    if (pkg === 'react-router-dom' && !seen.has(line)) { seen.add(line); out.push(line); }
  }
  return out;
}

// 缩进每一行
function indent(str, n) {
  const pad = ' '.repeat(n);
  return str.split('\n').map(l => l.length ? pad + l : l).join('\n');
}

// 从代码里提取「组件名」候选：function Xxx(、const Xxx =、class Xxx
// 要求首字母大写（React 组件约定），排除 React/ReactDOM 等内置
function extractComponentNames(code) {
  const set = new Set();
  const re1 = /\bfunction\s+([A-Z]\w*)\s*\(/g;          // function App(
  const re2 = /\bclass\s+([A-Z]\w*)\s+extends/g;        // class Clock extends
  const re3 = /\b(?:const|let|var)\s+([A-Z]\w*)\s*=/g;  // const App = / const Counter =
  // 箭头函数赋值也算组件：const App = (props) => 或 const App = () =>
  for (const re of [re1, re2, re3]) {
    let m;
    while ((m = re.exec(code))) set.add(m[1]);
  }
  // 优先级：App 排第一
  const arr = [...set];
  arr.sort((a, b) => (a === 'App' ? -1 : b === 'App' ? 1 : 0));
  return arr;
}

// === 主流程 ===
let total = 0, converted = 0, skipped = 0;
const manifest = [];   // 用于生成导航注册表

for (const chapter of CHAPTERS) {
  const srcDir = path.join(RUNOOB, chapter);
  if (!fs.existsSync(srcDir)) { continue; }
  const files = fs.readdirSync(srcDir).filter(f => /^example_.*\.jsx$/.test(f)).sort((a,b)=>{
    // 按数字排序：example_2 < example_10
    const na = parseInt(a.match(/\d+/)[0]); const nb = parseInt(b.match(/\d+/)[0]);
    return na - nb;
  });
  const outDir = path.join(DEMOS_DIR, chapter);
  fs.mkdirSync(outDir, { recursive: true });

  const chapterDemos = [];
  for (const file of files) {
    total++;
    const code = fs.readFileSync(path.join(srcDir, file), 'utf8');
    const base = file.replace(/\.jsx$/,'');
    const special = isSpecial(chapter, base, code);
    const outName = `${base}.jsx`;
    if (special) {
      // 特殊文件：写成「源码展示」demo
      const escaped = code.replace(/`/g,'\\`').replace(/\$\{/g,'\\${');
      const out = `/**
 * 章节: ${CHAPTER_TITLE[chapter] || chapter}
 * 来源: ${chapter}/${file} —— ⚠️ ${special}
 */
export const title = ${JSON.stringify(`${CHAPTER_TITLE[chapter]||chapter} · ${base} (源码展示)`)};
export const sourceFile = ${JSON.stringify(`${chapter}/${file}`)};
export const isSourceOnly = true;
export const sourceCode = ${'`'+escaped+'`'};
export function mount() {}
`;
      fs.writeFileSync(path.join(outDir, outName), out);
      chapterDemos.push({ file: outName.replace(/\.jsx$/,''), base, special: true });
      skipped++;
      continue;
    }
    const out = convert({ chapter, file, code });
    fs.writeFileSync(path.join(outDir, outName), out);
    chapterDemos.push({ file: outName.replace(/\.jsx$/,''), base, special: false });
    converted++;
  }
  manifest.push({ chapter, title: CHAPTER_TITLE[chapter] || chapter, demos: chapterDemos });
}

// 写出 manifest 供导航页使用
fs.writeFileSync(
  path.resolve(import.meta.dirname, '../src/manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log(`✅ 转换完成: 共 ${total} 个文件, 正常转换 ${converted}, 源码展示 ${skipped}`);
console.log(`📄 manifest 已写入 src/manifest.json (${manifest.length} 章节)`);
