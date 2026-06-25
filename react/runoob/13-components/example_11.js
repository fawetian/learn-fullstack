// 错误：修改 props
function BadComponent(props) {
  props.name = "Changed"; // 绝对不要这样做！
  return <h1>{props.name}</h1>;
}
// 正确：将 props 视为只读
function GoodComponent({ name }) {
  const displayName = name.toUpperCase(); // 创建新值
  return <h1>{displayName}</h1>;
}