import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponents extends React.Component {

state = { 
    listUser : [{
        id: 1,
        name: "quang huy",
        age: "18"
    },
{
        id: 2,
        name: "quang hai",
        age: "54"
    }
]
}


 
handleClick = (event) => {
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





    //  JSX
    render(){
        return (
            <div>
             <UserInfo></UserInfo>
             <br></br>
             <DisplayInfo listUser={this.state.listUser} ></DisplayInfo>
            </div>
        );
   }
}
export default MyComponents;