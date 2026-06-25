class CptBody extends React.Component{
    constructor(){
        super();
        this.state = {username : 1}; //可以传json等很多格式（这个是初始化赋值）
    }
    //click事件函数
    changeAge(){
        this.setState({username:1+this.state.username})
    }
    //change事件函数
    changeUsername(event){
        this.setState({username:parseInt(event.target.value)})
    }
    render(){
       return(
            <div>
                <h1>下面的操作有惊喜</h1>
                <p>{this.state.username}</p>
                <input type="button" value="点击改变username" onClick={()=>this.changeAge()}/>
                <BodyChild changeUsername={this.changeUsername.bind(this)} getname={this.state.username}/>
            </div>
        )
    }
}


class BodyChild extends React.Component{
    render(){
        return(
            <div>
                <p>子页面输入：<input type='text' value={this.props.getname} onChange={this.props.changeUsername} /></p>

            </div>
        )
    }
}
ReactDOM.render(
    <CptBody  />,
    document.getElementById('example')
);