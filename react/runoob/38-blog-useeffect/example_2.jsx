/**
 * ============================================================
 * 章节: React 博客项目：useEffect
 * 文件: react/runoob/38-blog-useeffect/example_2.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

// 文件路径：public/posts.json

[

  {

    "id": 1,

    "title": "React 入门完全指南",

    "summary": "从零开始学习 React Hooks，涵盖 useState、useEffect 等核心概念。",

    "content": "<h2>为什么学 React？</h2><p>React 是目前最流行的前端框架之一...</p>",

    "category": "React",

    "date": "2024-05-10"

  },

  {

    "id": 2,

    "title": "JavaScript 异步编程详解",

    "summary": "一文搞懂 Promise、async/await、事件循环与微任务队列。",

    "content": "<h2>什么是异步？</h2><p>JS 是单线程的...</p>",

    "category": "JavaScript",

    "date": "2024-05-08"

  },

  {

    "id": 3,

    "title": "CSS Grid 布局实战",

    "summary": "用 CSS Grid 轻松实现复杂的响应式布局。",

    "content": "<h2>Grid 入门</h2><p>Grid 是二维布局系统...</p>",

    "category": "CSS",

    "date": "2024-05-05"

  }

]