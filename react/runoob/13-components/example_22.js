// 不好：props 过多
function User({ name, age, email, address, phone, company, role, ... }) { }
// 好：使用对象
function User({ user }) {
  const { name, age, email } = user;
  // ...
}