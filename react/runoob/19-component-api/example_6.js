// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});