/**
 * ============================================================
 * 章节: React VS Code 配置
 * 文件: react/runoob/06-vscode/example_4.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import './App.css';

import Card from './components/Card.jsx';



function App() {

  return (

    <div

      style={{

        display: 'flex',

        flexWrap: 'wrap',

        justifyContent: 'center',

        padding: '40px',

        backgroundColor: '#f0f0f0',

        minHeight: '100vh',

      }}

    >

      {/* 第一张卡片：关于 React */}

      <Card

        title="React 是什么？"

        content="React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发。它采用组件化方式，让代码更易复用和维护。"

        imageUrl="https://react.dev/images/uwu.png"

      />



      {/* 第二张卡片：关于 Vite */}

      <Card

        title="Vite 的优势"

        content="Vite 是新一代前端构建工具，开发服务器启动极快，支持热模块替换（HMR），是现代 React 项目的首选。"

        imageUrl="https://vite.dev/logo-without-border.svg"

      />



      {/* 你可以再加第三张试试！ */}

    </div>

  );

}



export default App;