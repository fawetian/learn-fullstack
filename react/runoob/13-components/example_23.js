// 问题：props 需要层层传递
<App>
  <Layout user={user}>
    <Sidebar user={user}>
      <Menu user={user}>
        <MenuItem user={user} />
      </Menu>
    </Sidebar>
  </Layout>
</App>
// 解决：使用 Context 或状态管理