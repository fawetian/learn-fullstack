/**
 * ============================================================
 * 章节: React 博客项目：JSX
 * 文件: react/runoob/34-blog-jsx/example_3.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

function ArticleList() {

  // 用 JS 对象数组模拟文章数据

  const articles = [

    {

      id: 1,

      title: 'React 入门完全指南',

      summary: '从零开始学习 React Hooks，涵盖 useState、useEffect 等核心概念。',

      date: '2024-05-10',

      category: 'React',

      cover: '/images/react.png'

    },

    {

      id: 2,

      title: 'JavaScript 异步编程详解',

      summary: '一文搞懂 Promise、async/await、事件循环与微任务队列。',

      date: '2024-05-08',

      category: 'JavaScript',

      cover: '/images/js.png'

    },

    {

      id: 3,

      title: 'CSS Grid 布局实战',

      summary: '用 CSS Grid 轻松实现复杂的响应式布局。',

      date: '2024-05-05',

      category: 'CSS',

      cover: '/images/css.png'

    }

  ]



  return (

    <div className="article-list">

      {/* map 遍历数组，每条数据返回一段 JSX */}

      {articles.map(article => (

        <div key={article.id} className="card">

          <img src={article.cover} alt={article.title} />

          <div className="card-body">

            <span className="category">{article.category}</span>

            <h3>{article.title}</h3>

            <p>{article.summary}</p>

            <span className="date">{article.date}</span>

          </div>

        </div>

      ))}

    </div>

  )

}