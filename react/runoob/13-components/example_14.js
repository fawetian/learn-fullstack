// 通用的加载状态包装
function WithLoading({ isLoading, children }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return children;
}
// 使用
function UserList({ users, isLoading }) {
  return (
    <WithLoading isLoading={isLoading}>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </WithLoading>
  );
}