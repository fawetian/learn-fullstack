function Demo() {
  const user = { name: "Alice", age: 25 };
  const numbers = [1, 2, 3, 4, 5];
  const handleClick = () => alert("Clicked!");
  return (
    <MyComponent
      // 字符串
      title="Hello"
      // 数字
      count={42}
      // 布尔值
      isActive={true}
      // 数组
      items={numbers}
      // 对象
      user={user}
      // 函数
      onClick={handleClick}
      // JSX
      children={<p>This is content</p>}
    />
  );
}