/**
 * 章节: 生命周期
 * 来源: 20-lifecycle/example_1.jsx —— ⚠️ 原代码挂载到 document.body，与沙箱容器冲突，且属示意片段
 */
export const title = "生命周期 · example_1 (源码展示)";
export const sourceFile = "20-lifecycle/example_1.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React 生命周期
 * 文件: react/runoob/20-lifecycle/example_1.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
 
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
 
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
 
  tick() {
    this.setState({
      date: new Date()
    });
  }
 
  render() {
    return (
      <div>
        <h1>Hello, Runoob!</h1>
        <h2>现在时间是：{this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 
const root = ReactDOM.createRoot(document.body);
root.render(
  <Clock />
);`;
export function mount() {}
