class UserGist extends React.Component {
    constructor(props) {
        super(props);
        //在state设置两个属性，以便后续通过state对象来对其进行修改
        this.state = {username: '', lastGistUrl: ''};
        //绑定挂载事件
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        //接下来操作state时上下文对象发生改变，此处拿到操作句柄
        var that = this;
        //ajax请求
        this.serverRequest = $.ajax({
            url: this.props.source, 
            type:"GET",
            dataType: 'jsonp',
            success: function (result) {
                console.log(result.data);
                var lastGist = result.data[0];
                //此处的上下文发生改变，this的指针指向发生了变化，通过上述定义的that来操作
                that.setState({
                    username: lastGist.owner.login,
                    lastGistUrl: lastGist.html_url
                })
            }
        })
    }

    //卸载React组件时，把多余请求关闭，以免影响其他框架或组件的操作
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