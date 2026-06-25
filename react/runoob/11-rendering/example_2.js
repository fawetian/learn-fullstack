var myStyle = {color:'red',textAlign:'center'}

class Name extends React.Component {
  render() {
    return <h1 style={myStyle}>网站名称：{this.props.name}</h1>;
  }
}
class Url extends React.Component {
  render() {
    return <h1>网站地址：{this.props.url}</h1>;
  }
}
class Nickname extends React.Component {
  render() {
    return <h1>网站地址：{this.props.nickname}</h1>;
  }
}

function App(props) {
    return (
        <div>
            <Name name={props.name}/>
            <Url  url={props.url}/>
            <Nickname  nickname={props.nickname}/>
        </div>
    );
}