componentDidMount(){
    let _this = this;
    this.timerID = setInterval(function(){
      _this.tick();
    }, 1000);
}