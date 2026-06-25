// 原生 JavaScript（命令式）
const button = document.getElementById('myButton');
button.addEventListener('click', function() {
  const counter = document.getElementById('counter');
  const currentValue = parseInt(counter.textContent);
  counter.textContent = currentValue + 1;
});