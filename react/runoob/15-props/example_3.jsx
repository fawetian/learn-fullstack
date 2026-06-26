/**
 * ============================================================
 * 章节: React Props（属性）
 * 文件: react/runoob/15-props/example_3.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

const UserCard = (props) => {

  return (

    <div>

      <h2>{props.name}</h2>

      <p>Age: {props.age}</p>

      <p>Location: {props.location}</p>

    </div>

  );

};



const App = () => {

  return (

    <UserCard name="Alice" age={25} location="New York" />

  );

};



ReactDOM.render(<App />, document.getElementById('root'));