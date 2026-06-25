class Ex extends React.Component{

....  this.state={name:'Stupid Dog'};

... ... ...

function one(para){
    console.log('parameter in one Func',para);
}

... ... ...

render(){    
    var mm='AABB';
    return (<div><button onClick={this.one.bind(this,mm)}> test</button>
    <button onClick={this.one.bind(this,this.state.name)}> test</button></div>);

}}