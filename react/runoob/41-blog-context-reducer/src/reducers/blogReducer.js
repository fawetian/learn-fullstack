/**
 * ============================================================
 * 章节: React 博客项目：Context + Reducer
 * 文件: react/runoob/41-blog-context-reducer/src/reducers/blogReducer.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 这是 React 的初始状态定义，包含文章列表、搜索关键词、加载状态和错误信息
export const initialState = {
  articles: [],
  searchKeyword: '',
  loading: false,
  error: null,
}

// 这是 React 的 Reducer 纯函数，接收当前状态和 action，返回新状态
// 需要注意：reducer 不能执行副作用（如 API 请求），副作用应在组件或自定义 Hook 中处理
export function blogReducer(state, action) {
  // 这是 React 的 action 类型判断，根据 action.type 决定如何更新状态
  switch (action.type) {
    case 'SET_ARTICLES':
      // 这是 React 的不可变更新，返回包含新 articles 的新状态对象
      // 需要注意：使用展开运算符 ...state 保留未修改的其他状态字段
      return { ...state, articles: action.payload, loading: false, error: null }

    case 'SET_SEARCH_KEYWORD':
      // 这是 React 的搜索关键词更新，只需修改 searchKeyword 字段
      return { ...state, searchKeyword: action.payload }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }

    case 'LIKE_ARTICLE': {
      // 这是 React 的数组元素更新，使用 map 创建新数组，并修改匹配的元素
      // 需要注意：不能直接修改 state.articles[index]，必须创建新对象
      const id = action.payload
      return {
        ...state,
        articles: state.articles.map((article) =>
          article.id === id
            ? { ...article, likes: (article.likes || 0) + 1 }
            : article
        ),
      }
    }

    default:
      // 这是 React 的默认分支，遇到未知 action 时返回原状态（不报错）
      return state
  }
}
