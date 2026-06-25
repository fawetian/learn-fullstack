const isLoggedIn = true;
const count = 0;

return (
  <div>
    {isLoggedIn ? <h1>欢迎回来，{name}！</h1> : <h1>请登录</h1>}
    
    {count > 0 && <p>你有 {count} 条未读消息</p>}  {/* count 为 0 时不渲染 */}
  </div>
);