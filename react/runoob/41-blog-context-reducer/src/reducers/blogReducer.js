/**
 * 41-blog-context-reducer: 博客 Reducer
 * 来源章节: https://www.runoob.com/react/react-blog-context-reducer.html
 *
 * 这是 React 的 useReducer 纯函数，作用是集中管理所有博客相关的状态变更。
 * 需要注意：reducer 必须是纯函数，不能修改现有状态，必须返回新的状态对象。
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
