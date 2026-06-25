// 不好：组件做太多事情
function UserDashboard() {
  // 获取用户数据
  // 处理表单
  // 显示图表
  // 处理导航
  // ...
}
// 好：拆分成多个组件
function UserDashboard() {
  return (
    <div>
      <UserProfile />
      <UserStats />
      <UserActivity />
    </div>
  );
}