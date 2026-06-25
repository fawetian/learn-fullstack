class UserGist extends React.Component {
  constructor(props) {
      super(props);
      this.state = {username: [], lastGistUrl: []};
  }
 
  componentDidMount() {
    this.serverRequest = $.get(this.props.source, function (result) {
      var lastGist = result;
      var users = [];
      var urls = [];
      lastGist.map(
          function proc(item) {
            users.push(item.owner.login);
            urls.push(item.html_url);
        }
      );
      
      this.setState({
        username: users,
        lastGistUrl: urls
      });
    }.bind(this));
  }
 
  componentWillUnmount() {
    this.serverRequest.abort();
  }
 
  render() {
      var users = this.state.username;
    var urls = this.state.lastGistUrl;
        return (
          <ul>
            {
              users.map(
                function(user, index) {
                return (
              <div>
                  <li> {user} </li> 
                        <a href={urls[index]}  rel="nofollow"> {urls[index]} </a>
                    </div>
                    );
                }
              )
            }
          </ul>
        );
  }
}
 
ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('example')
);