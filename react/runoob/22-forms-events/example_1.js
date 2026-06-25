class HelloMessageChild extends React.Component {
  render(){
    return <div>
      <input type="text" value={this.props.myDataProp} onChange={this.props.updateStateProp} /> 
      <h4>子组件显示：{this.props.myDataProp}</h4>
      </div>;
  }
}
class HelloMessage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {value: '父组件',value1:"子组件"};
      this.handleChange = this.handleChange.bind(this);
      this.handleChange1 = this.handleChange1.bind(this);
  }
 
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleChange1(event) {
    this.setState({value1: event.target.value});
  }
  render() {
    var value = this.state.value;
    var value1 = this.state.value1;
    return <div>
            <table><tbody>
            <tr>
            <td>
              <input type="text" value={value} onChange={this.handleChange} /> 
              <h4>父组件显示：{value}</h4>
            </td>
            <td>
              <HelloMessageChild myDataProp = {value1} updateStateProp = {this.handleChange1} />
            </td>
            </tr>
            </tbody></table>
           </div>;
  }
}
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('formexmple')
);