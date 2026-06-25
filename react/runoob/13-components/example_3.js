// 方式 1：函数声明
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 方式 2：箭头函数
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

// 方式 3：简化写法（单行返回）
const Welcome = (props) => <h1>Hello, {props.name}</h1>;