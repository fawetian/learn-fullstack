/**
 * ============================================================
 * 章节: React 博客项目：useEffect
 * 文件: react/runoob/38-blog-useeffect/example_4.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

useEffect(() => {

  // 副作用：订阅事件

  const handleScroll = () => console.log('滚动了')

  window.addEventListener('scroll', handleScroll)



  // 返回清理函数

  return () => {

    // 组件卸载时自动移除事件监听，防止内存泄漏

    window.removeEventListener('scroll', handleScroll)

  }

}, [])



useEffect(() => {

  // 副作用：设置定时器

  const timer = setInterval(() => {

    console.log('每秒执行')

  }, 1000)



  return () => clearInterval(timer)  // 清理定时器

}, [])