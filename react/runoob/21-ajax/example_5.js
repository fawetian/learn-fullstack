componentDidMount() {
    fetch(this.props.source)
    .then(response => response.json())
    .then(result => {
      let lastGist = result[0];
      
      this.setState({
        username: lastGist.owner.login,
            lastGistUrl: lastGist.html_url
      });
    });
  }