/**
 * ============================================================
 * 章节: React 博客项目：自定义 Hooks
 * 文件: react/runoob/40-blog-custom-hooks/example_2.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/pages/HomePage.jsx

import { usePosts } from '../hooks/usePosts'

import BlogCard from '../components/BlogCard'

import CategoryFilter from '../components/CategoryFilter'



function HomePage() {

  // 一行代码获取所有文章相关数据和操作

  const {

    isLoading, error,

    activeCategory, setActiveCategory,

    keyword, setKeyword,

    categories,

    filteredArticles,

    refetch

  } = usePosts()



  if (isLoading) return <p className="status-msg">加载中...</p>

  if (error) return (

    <div className="status-msg error">

      <p>加载失败：{error}</p>

      <button onClick={refetch}>重试</button>

    </div>

  )



  return (

    <div>

      <h2 className="section-title">最新文章</h2>



      <div className="search-bar">

        <input

          type="text"

          value={keyword}

          onChange={e => setKeyword(e.target.value)}

          placeholder="搜索文章标题或摘要..."

          className="search-input"

        />

        {keyword && <span className="clear-btn" onClick={() => setKeyword('')}>✕</span>}

      </div>



      <CategoryFilter

        categories={categories}

        activeCategory={activeCategory}

        onCategoryChange={setActiveCategory}

      />



      <p className="result-info">共 {filteredArticles.length} 篇</p>



      {filteredArticles.length === 0 ? (

        <p className="empty-tip">没有匹配的文章</p>

      ) : (

        <div className="article-grid">

          {filteredArticles.map(article => (

            <BlogCard key={article.id} {...article} />

          ))}

        </div>

      )}

    </div>

  )

}



export default HomePage