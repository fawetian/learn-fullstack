// check-browser.mjs —— Playwright 在真实浏览器里验证每个 demo。
// 每个 demo 用临时 div 挂载、跑完移除；失败时 reload 页面重试一次（消除级联误报）。
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const VITE = process.env.VITE_URL || 'http://localhost:5174';
const ROOT = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/manifest.json'), 'utf8'));

const all = [];
for (const ch of manifest) for (const d of ch.demos)
  all.push({ chapter: ch.chapter, file: d.file, special: d.special, rel: `${ch.chapter}/${d.file}` });

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(VITE, { waitUntil: 'load' });

  const testDemo = (modPath) => page.evaluate(async (p) => {
    const errors = [];
    const origError = console.error;
    console.error = (...a) => { errors.push(a.map(String).join(' ')); };
    const container = document.createElement('div');
    container.style.cssText = 'width:100%;min-height:40px';
    document.body.appendChild(container);
    let mod;
    try { mod = await import(/* @vite-ignore */ p); }
    catch (e) { console.error = origError; container.remove(); return { err: '模块加载/编译失败: ' + e.message }; }
    if (mod.isSourceOnly) { console.error = origError; container.remove(); return { sourceOnly: true }; }
    if (typeof mod.mount !== 'function') { console.error = origError; container.remove(); return { err: '未导出 mount' }; }
    let cleanup;
    try { cleanup = mod.mount(container); }
    catch (e) { console.error = origError; container.remove(); return { err: 'mount 抛错: ' + e.message, errors }; }
    await new Promise(r => setTimeout(r, 220));
    const html = container.innerHTML;
    const hasContent = html.length > 0 && !/^\s*$/.test(html);
    console.error = origError;
    try { if (typeof cleanup === 'function') cleanup(); } catch(e){}
    await new Promise(r => setTimeout(r, 120));
    container.remove();
    return { hasContent, len: html.length, errors };
  }, modPath);

  const results = [];
  let n = 0;
  for (const d of all) {
    n++;
    process.stdout.write(`[${String(n).padStart(3)}/${all.length}] ${d.rel.padEnd(42)} `);
    const modPath = `/src/demos/${d.chapter}/${d.file}.jsx`;
    let res;
    try { res = await testDemo(modPath); }
    catch (e) { res = { err: e.message }; }

    // 偶发性失败（execution context destroyed 等）→ reload 页面重试一次
    const flaky = (typeof res.err === 'string' && /Execution context was destroyed|Target closed|Navigation/i.test(res.err));
    if (flaky) {
      await page.goto(VITE, { waitUntil: 'load' }).catch(()=>{});
      try { res = await testDemo(modPath); } catch (e) { res = { err: e.message }; }
    }

    if (res.sourceOnly) { console.log('📄 源码展示'); results.push({ ...d, ok: true, sourceOnly: true }); }
    else if (res.err) { console.log(`❌ ${res.err.slice(0,70)}`); results.push({ ...d, ok: false, err: res.err }); }
    else if (!res.hasContent) {
      const hint = (res.errors && res.errors.length) ? (' | ' + res.errors[0].slice(0,60)) : '';
      console.log(`⚠️  空${hint}`); results.push({ ...d, ok: false, err: '渲染后容器为空' + hint });
    }
    else { console.log(`✅ ${res.len}B`); results.push({ ...d, ok: true }); }
  }

  await browser.close();
  const ok = results.filter(r => r.ok);
  const fail = results.filter(r => !r.ok);
  fs.writeFileSync(path.join(ROOT, 'scripts/check-result.json'), JSON.stringify({ ok, fail }, null, 2));
  console.log(`\n=== ✅ 通过 ${ok.length}   ❌ 失败 ${fail.length} ===`);
  const bucket = {};
  for (const f of fail) { const k = (f.err||'').replace(/^.*?:\s*/, '').slice(0, 55); bucket[k] = (bucket[k]||0)+1; }
  if (Object.keys(bucket).length) { console.log('\n失败原因汇总:'); for (const [k,c] of Object.entries(bucket)) console.log(`  [${c}] ${k}`); }
}
main().catch(e => { console.error(e); process.exit(1); });
