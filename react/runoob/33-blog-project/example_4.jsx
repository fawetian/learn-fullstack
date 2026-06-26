/**
 * ============================================================
 * 章节: React 博客项目：初始化
 * 文件: react/runoob/33-blog-project/example_4.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/App.jsx

import './App.css'



function App() {

  return (

    <div className="app">

      {/* 顶部导航栏 */}

      <header className="navbar">

        <h1 className="logo">RUNOOB Blog</h1>

        <nav>

          <a href="/">首页</a>

          <a href="#">关于</a>

        </nav>

      </header>



      {/* 主内容区 */}

      <main className="container">

        <p>博客内容将在这里展示</p>

      </main>



      {/* 页脚 */}

      <footer className="footer">

        <p>© 2024 RUNOOB Blog. Powered by React.</p>

      </footer>

    </div>

  )

}



export default App