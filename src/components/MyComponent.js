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

handleAddUser = (newUser) => {
    this.setState({
       listUser : [newUser,...this.state.listUser]
    })
}

handleDeleteUser = (userID) => {
    let filterUser = this.state.listUser
    filterUser = filterUser.filter(item => item.id !== userID)
    this.setState({
        listUser: filterUser
    })
}

    //  JSX
    render(){
        return (
            <div>
             <UserInfo    handleAddUser = {this.handleAddUser}  
           
             ></UserInfo>
             <br></br>
             <DisplayInfo listUser={this.state.listUser}   
                         handleDeleteUser = {this.handleDeleteUser} >          
             </DisplayInfo>
           
            </div>
        );
   }
}
export default MyComponents;