class Hello extends React.Component{
    constructor(){
        super()
        this.state = {
            content:true
        }
    }
    
    change=obj=>{
        this.setState({
            content:!this.state.content
        })
        console.log(obj)
    }

    render(){
        return (
            <div>
                <h1>{this.state.content ? '1':'2'}</h1>
                <h2>{this.props.name}</h2>
                <button onClick={this.change(this.state.content)}>
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