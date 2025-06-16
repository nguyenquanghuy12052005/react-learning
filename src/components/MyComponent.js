import React, { useState } from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

// class MyComponents extends React.Component {

// state = { 
//     listUser : [{
//         id: 1,
//         name: "quang huy",
//         age: "18"
//     },
// {
//         id: 2,
//         name: "quang hai",
//         age: "54"
//     }
// ]
// }

// handleAddUser = (newUser) => {
//     this.setState({
//        listUser : [newUser,...this.state.listUser]
//     })
// }

// handleDeleteUser = (userID) => {
//     let filterUser = this.state.listUser
//     filterUser = filterUser.filter(item => item.id !== userID)
//     this.setState({
//         listUser: filterUser
//     })
// }

//     //  JSX
//     render(){
//         return (
//             <div>
//              <UserInfo    handleAddUser = {this.handleAddUser}  
           
//              ></UserInfo>
//              <br></br>
//              <DisplayInfo listUser={this.state.listUser}   
//                          handleDeleteUser = {this.handleDeleteUser} >          
//              </DisplayInfo>
           
//             </div>
//         );
//    }
// }


const MyComponents = (props) => {
       const [listUser, setListUser] = useState([
        {
        id: 1,
        name: "quang huy",
        age: "18"
    },
{
        id: 2,
        name: "quang hai",
        age: "54"
    }
     ]  );

   const  handleAddUser = (newUser) => {
    setListUser([newUser,...listUser])  
}



const handleDeleteUser = (userID) => {
    let filterUser = listUser
    filterUser = filterUser.filter(item => item.id !== userID)

    setListUser(filterUser)

}

            return (
            <div>
             <UserInfo    
             handleAddUser = {handleAddUser} >
             </UserInfo>

             <br></br>

             <DisplayInfo listUser={listUser}   
                         handleDeleteUser = {handleDeleteUser} >          
             </DisplayInfo>
           
            </div>
        );

}
export default MyComponents;