/**
 * ============================================================
 * 章节: React 博客项目：初始化
 * 文件: react/runoob/33-blog-project/example_2.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// JSX 就是 return 后面的这段类 HTML 代码

function Greeting() {

  const name = 'RUNOOB'

  const isLoggedIn = true



  return (

    <div className="greeting">

      {/* JSX 注释：花括号内放任何 JS 表达式 */}

      <h1>Hello, {name}!</h1>

      <p>当前时间：{new Date().toLocaleDateString()}</p>

      {isLoggedIn && <p>欢迎回来！</p>}

    </div>

  )

}