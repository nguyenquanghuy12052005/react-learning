import React from "react";

class MyComponents extends React.Component {
    state = {
        name: 'huy nguyêmx ',
        age: 20,
        address: 'quang nam'
    }
handerClick = (event) => {
// console.log("click me" + Math.random());
console.log(this.state.name);
console.log(this.state.age);
this.setState({
    name: 'quang huy ne',
    age: Math.floor((Math.random() * 100) +1) //random 1->100
})


}

onmoursoverClick(event) {
// console.log("click me" + Math.random());
console.log(event);
}


handerOnchangeInput = (event)=>{    
this.setState  ({
    name: event.target.value
})
}

handerOnSubmit = (event) => {
event.preventDefault(); //hàm ngăn load lại trang khi submit
console.log(this.state);
}

    //  JSX
    render(){
        return (
            <div>hellll-1 {this.state.name} and {this.state.age}
            <button onMouseOver={this.onmoursoverClick}>onMouseOver me</button>
             <button onClick={this.handerClick}>Click me</button> 

             <form onSubmit={(event) => this.handerOnSubmit(event)}>
                <input type="text" onChange={(event) => this.handerOnchangeInput(event)}></input>
                <button>summit</button>
             </form>
            </div>
        );
   }
}
export default MyComponents;