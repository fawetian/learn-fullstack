// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));