// 容器组件：处理逻辑和状态
function Panel({ title, children, collapsible = false }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>{title}</h2>
        {collapsible && (
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Collapse" : "Expand"}
          </button>
        )}
      </div>
      {isOpen && (
        <div className="panel-content">
          {children}
        </div>
      )}
    </div>
  );
}
// 使用
function App() {
  return (
    <Panel title="Settings" collapsible>
      <p>Your settings here...</p>
    </Panel>
  );
}