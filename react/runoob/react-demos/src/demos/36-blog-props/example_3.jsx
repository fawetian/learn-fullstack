/**
 * 章节: 博客·Props
 * 来源: 36-blog-props/example_3.jsx —— ⚠️ CategoryFilter 需父组件传入 categories/onCategoryChange 等 props，单独渲染缺数据
 */
export const title = "博客·Props · example_3 (源码展示)";
export const sourceFile = "36-blog-props/example_3.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React 博客项目：Props
 * 文件: react/runoob/36-blog-props/example_3.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：src/components/CategoryFilter.jsx

function CategoryFilter({ categories, activeCategory, onCategoryChange }) {

  return (

    <div className="filter-bar">

      {categories.map(cat => (

        <button

          key={cat}

          className={activeCategory === cat ? 'active' : ''}

          // 点击时调用父组件传来的回调函数

          onClick={() => onCategoryChange(cat)}

        >

          {cat}

        </button>

      ))}

    </div>

  )

}



export default CategoryFilter`;
export function mount() {}
