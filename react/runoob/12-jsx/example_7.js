const name = 'runoob';
const now = new Date().toLocaleString();

return (
  <div>
    <h1>你好，{name}！</h1>
    <p>当前时间：{now}</p>
    <p>计算结果：{2 + 3 * 5}</p>  {/* 17 */}
  </div>
);