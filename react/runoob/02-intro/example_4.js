// 假设要更新 1000 个列表项
const items = Array(1000).fill(0).map((_, i) => i);

// 传统方式：每次都操作真实 DOM（慢）
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  ul.appendChild(li); // 1000 次 DOM 操作
});

// React 方式：通过虚拟 DOM 批量更新
function ItemList() {
  return (
    <ul>
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}
// React 会智能地批量更新 DOM