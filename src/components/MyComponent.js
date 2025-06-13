import React from "react";
import UserInfo from "./UserInfo";

class MyComponents extends React.Component {
 
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
            </div>
        );
   }
}
export default MyComponents;