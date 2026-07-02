// check.mjs —— 用 esbuild 把每个 demo 连同依赖 bundle 成单文件，在 jsdom 里真实调用 mount() 检查能否运行
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import esbuild from 'esbuild';

const ROOT = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/manifest.json'), 'utf8'));

function makeEnv() {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost/', pretendToBeVisual: true,
  });
  const { window } = dom;
  // Node 26 的 globalThis 上 navigator/window 等是只读 accessor，用 defineProperty 强写
  const defs = {
    window, document: window.document, navigator: window.navigator,
    HTMLElement: window.HTMLElement, Node: window.Node, Event: window.Event,
    CustomEvent: window.CustomEvent, MutationObserver: window.MutationObserver,
    SVGElement: window.SVGElement, getComputedStyle: window.getComputedStyle,
    requestAnimationFrame: (cb) => setTimeout(() => cb(Date.now()), 16),
    cancelAnimationFrame: (id) => clearTimeout(id),
  };
  for (const [k, v] of Object.entries(defs)) {
    try { Object.defineProperty(globalThis, k, { value: v, writable: true, configurable: true }); }
    catch (e) { /* 某些属性可能已配置过，忽略 */ }
  }
  window.requestAnimationFrame = globalThis.requestAnimationFrame;
  window.cancelAnimationFrame = globalThis.cancelAnimationFrame;
  return dom;
}

async function bundleDemo(file) {
  // 用 esbuild bundle，把 React/ReactDOM 一起打进来，输出 IIFE 不写文件
  const result = await esbuild.build({
    entryPoints: [file],
    bundle: true,
    format: 'cjs',
    write: false,
    jsx: 'automatic',
    target: 'es2020',
    logLevel: 'silent',
    define: { 'process.env.NODE_ENV': '"development"' },
  });
  return result.outputFiles[0].text;
}

async function checkOne(demoFile) {
  // 每次 fresh 的 jsdom + global，避免 demo 间 React 实例污染
  makeEnv();
  const code = await bundleDemo(demoFile);
  const container = document.createElement('div');
  document.body.appendChild(container);

  // eval 出模块，拿到 exports
  const moduleExports = {};
  const moduleShim = { exports: moduleExports };
  const fn = new Function('module', 'exports', code + '\n;return module.exports;');
  let mod;
  try {
    mod = fn(moduleShim, moduleExports);
  } catch (e) {
    throw new Error(`模块加载失败: ${e.message}`);
  }
  if (mod.isSourceOnly) return { sourceOnly: true };
  if (typeof mod.mount !== 'function') throw new Error('未导出 mount');
  const cleanup = mod.mount(container);
  await new Promise(r => setTimeout(r, 60));   // 让 timer/paint 跑一轮
  const hasContent = container.innerHTML.length > 0;
  if (typeof cleanup === 'function') { try { cleanup(); } catch(e){} }
  return { hasContent };
}

async function main() {
  const results = { ok: [], fail: [] };
  let n = 0;
  for (const ch of manifest) {
    for (const d of ch.demos) {
      n++;
      const rel = `${ch.chapter}/${d.file}.jsx`;
      const full = path.join(ROOT, 'src/demos', ch.chapter, d.file + '.jsx');
      process.stdout.write(`[${String(n).padStart(3)}] ${rel.padEnd(40)} `);
      try {
        const r = await checkOne(full);
        if (r.sourceOnly) { console.log('📄 源码展示'); results.ok.push({ rel, sourceOnly: true }); }
        else if (!r.hasContent) { console.log('⚠️  容器为空'); results.fail.push({ rel, err: '渲染后容器为空(可能渲染 null 或异常)' }); }
        else { console.log('✅'); results.ok.push({ rel }); }
      } catch (e) {
        console.log(`❌ ${e.message}`);
        results.fail.push({ rel, err: e.message });
      }
    }
  }
  fs.writeFileSync(path.join(ROOT, 'scripts/check-result.json'), JSON.stringify(results, null, 2));
  console.log(`\n=== ✅ 通过 ${results.ok.length}  ❌ 失败 ${results.fail.length} ===`);
  if (results.fail.length) {
    console.log('\n失败清单:');
    for (const f of results.fail) console.log(`  ${f.rel}\n      → ${f.err}`);
  }
}
main();
