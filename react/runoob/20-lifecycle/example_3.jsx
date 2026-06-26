/**
 * ============================================================
 * 章节: React 生命周期
 * 文件: react/runoob/20-lifecycle/example_3.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: 0 };
    this.setNewNumber = this.setNewNumber.bind(this);
  }
 
  setNewNumber() {
    this.setState({ data: this.state.data + 1 });
  }
 
  render() {
    return (
      <div>
        <button onClick={this.setNewNumber}>INCREMENT</button>
        <Content myNumber={this.state.data} />
      </div>
    );
  }
}
 
class Content extends React.Component {
  componentDidMount() {
    console.log("Component DID MOUNT!");
  }
 
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
 
  componentDidUpdate(prevProps, prevState) {
    console.log("Component DID UPDATE!");
  }
 
  componentWillUnmount() {
    console.log("Component WILL UNMOUNT!");
  }
 
  render() {
    return (
      <div>
        <h3>{this.props.myNumber}</h3>
      </div>
    );
  }
}
 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Button />
  </div>
);