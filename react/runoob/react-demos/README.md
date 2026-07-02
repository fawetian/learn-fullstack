# react-demos —— 菜鸟教程 React 示例全集（可运行）

把 `runoob/` 下从 `11-rendering` 到 `41-blog-context-reducer` 共 **30 章、169 个** React 示例
集中到这一个 Vite 项目里，全部可在浏览器中运行/查看。

## 为什么需要这个项目

原教程里的 `example_*.jsx` 是**代码片段**，浏览器看不懂 JSX —— 必须经 React 工具链
（Vite/Babel）编译才能跑。直接双击打开是运行不了的。本项目把这些片段统一包装成
可在 SPA 里挂载的 `mount(container)` demo，借 Vite 的工具链让它们全部活过来。

## 运行

```bash
cd react-demos
npm install        # 首次需要
npm run dev        # Vite 启动，秒开
```

浏览器打开终端打印的地址（默认 http://localhost:5173，若被占用则顺延为 5174 等）。

- **左侧**：30 个章节的树形导航，每个 demo 一个条目
- **右侧**：点击任一条目，实时渲染该 demo
- 标 **「源码」黄标签** 的条目：原教程里就无法独立运行的片段（依赖外部文件/包、
  原代码有缺陷、纯 API 示意），会显示黄色提示 + 源码，而不是强行渲染

## 项目结构

```
react-demos/
├── src/
│   ├── demos/<章节>/example_X.jsx   # 169 个 demo（由 scripts/convert.mjs 生成）
│   ├── components/DemoRunner.jsx    # 沙箱执行器：mount/cleanup 管理
│   ├── App.jsx                      # 总导航页（左章节树 + 右渲染区）
│   └── manifest.json                # 章节↔demo 注册表（自动生成）
└── scripts/
    ├── convert.mjs                  # 转换脚本：原 example_*.jsx → 可运行 demo
    ├── check-browser.mjs            # 检查脚本：Playwright 真实浏览器逐个验证
    └── check-result.json            # 最近一次检查结果
```

## 转换原理（核心：沙箱包装）

原始 example 多为「直接操作 DOM 的脚本」，末尾常有
`ReactDOM.createRoot(document.getElementById('root')).render(...)`。
直接跑会跟本 SPA 的入口抢 `#root`，且 `setInterval` 无人清理。

`convert.mjs` 把每个原代码包进一个 `mount(container)` 沙箱：

- **劫持 `document.getElementById`** —— 无论原代码找 `root`/`example`/`app`，
  都返回 DemoRunner 提供的真实容器，于是 `createRoot` 挂到这里
- **提供兼容的 `ReactDOM`** —— 含旧版 `render`/`unmountComponentAtNode`，免改老代码
- **补全被清掉的 import** —— `Component`/`useState`/`PropTypes` 等
- **cleanup 推迟一帧** —— 用 `setTimeout` 避开 React「synchronously unmount while rendering」
- 用到 `react-router-dom` 的组件，自动外层包 `<BrowserRouter>`

依赖外部文件（`./components/BlogCard` 等）或原代码有缺陷的，自动标为**源码展示**并说明原因。

## 重新生成 / 检查

```bash
# 重新转换全部 demo（修改 scripts/convert.mjs 后重跑）
node scripts/convert.mjs

# 用真实浏览器逐个验证（需先 npm run dev）
node scripts/check-browser.mjs
```

最近一次检查：**169/169 通过，0 失败**。

## 依赖

- React 19 + Vite（脚手架自带）
- `react-router-dom`（25-router、37-blog-router 等章节需要）
- 开发依赖：`playwright`（检查脚本）、`jsdom`/`esbuild`（备用检查）
