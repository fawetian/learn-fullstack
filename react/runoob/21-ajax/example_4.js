<div id="example"></div>

<script type="text/babel">
class UserGist extends React.Component {
  constructor(props) {
      super(props);
      this.state = {username: '', lastGistUrl: '',source:'https://api.github.com/users/octocat/gists'};
  }

 
  componentDidMount() {
    this.serverRequest = $.get(this.state.source, function (result) {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this));
  }
 
  componentWillUnmount() {
    this.serverRequest.abort();
  }
 
  render() {
    return (
      <div>
        {this.state.username} 用户最新的 Gist 共享地址：
        <a href="{this.state.lastGistUrl}" rel="nofollow">{this.state.lastGistUrl}</a>
      </div>
    );
  }
}
 
ReactDOM.render(
  <UserGist />,
  document.getElementById('example')
);
</script>