/**
 * 章节: Refs
 * 来源: 23-refs/example_5.jsx —— ⚠️ 原代码 render 了 <MyComponent/> 但定义的是 ParentComponent（原教程笔误）
 */
export const title = "Refs · example_5 (源码展示)";
export const sourceFile = "23-refs/example_5.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React Refs
 * 文件: react/runoob/23-refs/example_5.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

class ChildComponent extends React.Component {

  focusInput = () => {

    this.inputRef.current.focus();

  };



  constructor(props) {

    super(props);

    this.inputRef = React.createRef();

  }



  render() {

    return <input type="text" ref={this.inputRef} />;

  }

}



class ParentComponent extends React.Component {

  constructor(props) {

    super(props);

    this.childRef = React.createRef();

  }



  handleClick = () => {

    this.childRef.current.focusInput();

  };



  render() {

    return (

      <div>

        <ChildComponent ref={this.childRef} />

        <button onClick={this.handleClick}>Focus Child Input</button>

      </div>

    );

  }

}



const root = ReactDOM.createRoot(document.getElementById("root"));

// 渲染 MyComponent 组件

root.render(<MyComponent />);`;
export function mount() {}
