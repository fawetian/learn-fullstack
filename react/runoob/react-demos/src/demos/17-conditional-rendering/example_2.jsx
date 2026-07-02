/**
 * 章节: 条件渲染
 * 来源: 17-conditional-rendering/example_2.jsx —— ⚠️ 依赖同章 example_1 的 Greeting 组件，且 setState 时序在沙箱内不稳定，属示意片段
 */
export const title = "条件渲染 · example_2 (源码展示)";
export const sourceFile = "17-conditional-rendering/example_2.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React 条件渲染
 * 文件: react/runoob/17-conditional-rendering/example_2.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }
 
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
 
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
 
  render() {
    const isLoggedIn = this.state.isLoggedIn;
 
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
 
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginControl />
);`;
export function mount() {}
