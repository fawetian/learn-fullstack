/**
 * ============================================================
 * 章节: React 博客项目：初始化
 * 文件: react/runoob/33-blog-project/example_3.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 定义一个组件：就是一个返回 JSX 的函数

// 组件名必须大写字母开头

function BlogHeader() {

  return (

    <header>

      <h1>RUNOOB Blog</h1>

    </header>

  )

}



// 使用组件：像 HTML 标签一样写，自闭合或成对都可以

function App() {

  return (

    <div>

      <BlogHeader />

      <main>

        <p>博客内容将在这里展示</p>

      </main>

    </div>

  )

}



export default App