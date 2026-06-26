/**
 * ============================================================
 * 章节: React 博客项目：Context + Reducer
 * 文件: react/runoob/41-blog-context-reducer/example_5.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/components/BlogCard.jsx

import { Link } from 'react-router-dom'

import { useFavorites } from '../context/FavoriteContext'



function BlogCard({ id, title, summary, date, category }) {

  const { isFavorite, toggleFavorite } = useFavorites()



  function handleFavorite(e) {

    e.preventDefault()   // 阻止 Link 跳转

    toggleFavorite(id)

  }



  return (

    <Link to={`/post/${id}`} className="card-link">

      <div className="card">

        <span className="tag">{category}</span>

        <h3>{title}</h3>

        <p>{summary}</p>

        <div className="card-footer">

          <span className="date">{date}</span>

          <button className="fav-btn" onClick={handleFavorite}>

            {isFavorite(id) ? '&#x2665;' : '♡'}

          </button>

        </div>

      </div>

    </Link>

  )

}



export default BlogCard