// 推荐：直接解构
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}
// 带默认值的解构
function Button({ text = "Submit", variant = "primary", disabled = false }) {
  return (
    <button className={variant} disabled={disabled}>
      {text}
    </button>
  );
}