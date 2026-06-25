class Hello extends React.Component{
    constructor(){
        super()
        this.state = {
            content:true
        }
        this.change = this.change.bind(this,this.state.content)
    }
    
    change(obj){
        this.setState({
            content:!this.state.content
        })
        console.log(obj)
        console.log(this.state.content)
    }

    render(){
        return (
            <div>
                <h1>{this.state.content ? '1':'2'}</h1>
                <h2>{this.props.name}</h2>
                <button onClick={this.change}>
                    点击
                </button>
            </div>
        )
    }
}

ReactDOM.render(
    <Hello name="Hello"/>,
    document.getElementById('example')
)