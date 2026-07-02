# 03-install-npm: 通过 npm 使用 React

来源: https://www.runoob.com/react/react-install-npm.html

## 核心概念

1. **npm 包管理** — Node.js 的包管理器，用于安装 React 及其依赖库（react-dom、react-scripts）。
2. **create-react-app** — Facebook 官方提供的 React 项目脚手架，快速搭建基于 Webpack 的 React 开发环境（现已不推荐使用）。
3. **node_modules** — npm 安装的依赖包存放目录，不应提交到版本控制（需配合 `.gitignore`）。
4. **package.json** — 记录项目依赖、脚本命令和元数据，是项目的"配置清单"。
5. **npm start** — 启动开发服务器，提供热更新（HMR）和错误提示功能。

## 文件说明

| 文件 | 说明 |
|------|------|
| `example_1.js` | 安装命令示例 |
| `example_3.js` | 创建项目示例 |
| `example_4.js` | 启动项目示例 |
| `example_5.js` | 项目结构说明 |

## 运行/学习方法

本章是环境配置章节，说明传统 create-react-app 的安装方式。实际学习建议使用 `04-install-vite` 章节的 Vite 方式，启动速度更快。本章示例文件记录了命令和配置，可供参考对比。

```bash
# 传统方式（参考）
npm install -g create-react-app
npx create-react-app my-app
```

## 在 my-app 中运行所有 example（实际练习用）

`example_*.jsx` 是代码片段，**不能单独运行**——浏览器看不懂 JSX，必须由 React 工具链（Webpack + Babel，藏在 `my-app/node_modules` 里）编译后才能跑。类比 Go：`.go` 文件必须有 `go build` 才能运行。

因此把 5 个 example 迁移进了 `my-app/src/examples/`，借 `my-app` 的工具链统一运行。

### 运行步骤

```bash
cd my-app
npm start        # 首次编译约 30~60 秒，之后秒开
# 浏览器打开 http://localhost:3000（若端口被占用会顺延，如 3001）
```

页面顶部有 5 个按钮，点击即可切换查看每个 example 的渲染效果。

### example 与组件对应关系

| 顶栏按钮 | 源文件 | 演示内容 |
|---------|--------|---------|
| example_1 | `src/examples/Example1.jsx` | class 组件写法（React 老写法） |
| example_2 | `src/examples/Example2.jsx` | Hello 函数组件 + props 传参演示 |
| example_3 | `src/examples/Example3.jsx` | 函数组件写法（现代主流） |
| example_4 | `src/examples/Example4.jsx` | 独立 Hello 子组件（被 example_5 引用） |
| example_5 | `src/examples/Example5.jsx` | App 引用 example_4 的 Hello 组件 |

### 改造说明

- **`example_2`** 原文含 `ReactDOM.createRoot(document.getElementById('root'))`，会与 `my-app/src/index.js` 的入口冲突（一个页面只能挂载一次，类比 Go 只能有一个 `main()`）。已将其改为「同一组件传不同 props 渲染多次」的演示。
- **`example_4` / `example_5`** 保持配套：`Example5.jsx` 通过 `import Hello from './Example4'` 复用 example_4 的组件。
- **`src/App.js`** 改为导航主页，用 `useState` 切换当前显示哪个 example——点按钮改状态、界面自动更新，本身就是一个 `useState` 的活例子。

> 每个 `Example*.jsx` 顶部都保留了原版「Go 后端开发者视角」注释，可在 IDE 中打开对照学习。
