/**
 * 章节: AJAX
 * 来源: 21-ajax/example_3.jsx —— ⚠️ 依赖全局 jQuery ($)，且 componentDidMount 用 $.get，无法独立运行
 */
export const title = "AJAX · example_3 (源码展示)";
export const sourceFile = "21-ajax/example_3.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React AJAX
 * 文件: react/runoob/21-ajax/example_3.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

class UserGist extends React.Component {
  constructor(props) {
      super(props);
      this.state = {username: '', lastGistUrl: ''};
  }
 
 
  componentDidMount() {
    this.serverRequest = $.get(this.props.source, function (result) {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this));
  }
 
  componentWillUnmount() {
    this.serverRequest.abort();
  }
 
  render() {
    return (
      <div>
        {this.state.username} 用户最新的 Gist 共享地址：
        <a href={this.state.lastGistUrl}>{this.state.lastGistUrl}</a>
      </div>
    );
  }
}
 
 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />
);`;
export function mount() {}
