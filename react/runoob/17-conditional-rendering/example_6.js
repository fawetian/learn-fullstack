class Hello extends React.Component{
  render(){
    return (
      <h1>Hello ,Welcome to ziyang Blog</h1>
    )
  }
}
class Gobye extends React.Component{
  render(){
    return(
      <h1>Oh,Go Bye!</h1>
    )
  }
}
class Demo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      who:true
    }
    this.login = this.login.bind(this);
  }
  login(){
    this.setState((prevState)=>({
      who : !prevState.who
    }))
  }
  render(){
    let element = <button onClick={this.login}>{this.state.who ? '退出登录' : '登录'}</button>;
    if(this.state.who){
        return (
          <div>
            {element}
            <Hello />
          </div>
        )
    }else{
        return (
          <div>
            {element}
            <Gobye />  
          </div>
        )
    }
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('app')
)