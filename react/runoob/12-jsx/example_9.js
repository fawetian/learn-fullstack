const items = [
  { id: 1, name: '苹果' },
  { id: 2, name: '香蕉' },
  { id: 3, name: '橙子' },
];

return (
  <ul>
    {items.map(item => (
      <li key={item.id}>  {/* key 必须唯一且稳定！ */}
        {item.name}
      </li>
    ))}
  </ul>
);