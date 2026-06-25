// 方式 1：使用 props.children
function Card(props) {
  return (
    <div className="card">
      <div className="card-body">
        {props.children}
      </div>
    </div>
  );
}
// 方式 2：解构 children
function Card({ children, title }) {
  return (
    <div className="card">
      {title && <h2>{title}</h2>}
      <div className="card-body">{children}</div>
    </div>
  );
}
// 使用
function App() {
  return (
    <Card title="My Card">
      <p>This is the card content</p>
      <button>Click me</button>
    </Card>
  );
}