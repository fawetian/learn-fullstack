const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);