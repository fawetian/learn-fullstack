/**
 * ============================================================
 * 章节: React 博客项目：JSX
 * 文件: react/runoob/34-blog-jsx/example_4.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

function ArticlePage() {

  const articles = []

  const isLoading = false



  return (

    <div>

      {/* 方式一：三元表达式 — 适合二选一 */}

      {isLoading ? (

        <p>加载中，请稍候...</p>

      ) : (

        <p>加载完成！</p>

      )}



      {/* 方式二：&& 短路 — 适合「有条件就显示，没条件就不显示」 */}

      {articles.length === 0 && <p>还没有文章，敬请期待。</p>}



      {/* 方式三：if/else 在组件顶层 — 适合复杂多条件逻辑 */}

      {articles.length > 0 ? (

        <div>

          {articles.map(a => <div key={a.id}>{a.title}</div>)}

        </div>

      ) : (

        <p>暂无数据</p>

      )}

    </div>

  )

}