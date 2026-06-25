class UserGist extends React.Component {
  constructor(props) {
      super(props);
      this.state = {username: '', lastGistUrl: ''};
  }
 
 
  componentDidMount() {
  //可以通过箭头函数绑定this
    this.serverRequest = $.get(this.props.source, (result)=> {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    });
  }
 
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  
  
  render() {
      return (
        <div>
          {this.state.username} 用户最新的 Gist 共享地址：
          <a href={this.state.lastGistUrl} rel="nofollow">{this.state.lastGistUrl}</a>
        </div>
      );
    }
  }
 
  ReactDOM.render(
    <UserGist source="https://api.github.com/users/octocat/gists" />,
    document.getElementById('example')
  );