this.timerID = setInterval(function(){   //setInterval是window的方法
    return this.tick();                  //this指的是window
  },1000
);