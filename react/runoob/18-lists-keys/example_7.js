var ListItem = (props) => {       //es6中箭头函数
    return <li>{props.value}</li>;
}

function NumberList(props) {
    var numbers;    //声明在外面是因为 {} 中不能出现var,const,let等这种关键字
    return (
    <ul>
      {
        numbers = props.numbers,   //注意这里要加逗号

        numbers.map((number) =>
        <ListItem key={number}
         value={number} />
      )}
    </ul>
    );
}

var arr = [1,2,3];   //要传递的参数
ReactDOM.render(
    <NumberList numbers={arr}/>,  //这里的numbers就是props下的numbers,即props.numbers
    document.all('example')
);