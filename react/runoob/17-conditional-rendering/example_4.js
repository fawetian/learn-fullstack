handleToggleClick(){    
  this.setState(prevState=>({ // 这里 prevState 
      showWarning:!prevState.showWarning 
    })
  );
}