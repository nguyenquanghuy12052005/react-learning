import React from "react";
import './DisplayInfo.scss'
import logo from './../logo.svg'

// class DisplayInfo extends React.Component {

//     state = {
//         ShowListUser: true
//     }

     
            

//     render() {
//           const {listUser} = this.props;
  
//         return (
//             //props
//             <div className="display-info-container">
                      
//                 {listUser.map((user) => {
//                     return(
//                <div>    
//                     {true && <div key = {user.id} className={user.age < 20 ? "red" : "green"}>
//                             <div>name: {user.name}</div>
//                             <div>age: {user.age}</div>
//                              <span onClick={() => {this.props.handleDeleteUser(user.id)}}><button>xoá</button></span>
//                             <hr></hr>
//                          </div>  
//                          }
                       
//                             </div>  
//                     )

//                 } )} 
//                 </div>
            
//         )
//     }
// }

const DisplayInfo = (props) => { 
   const {listUser} = props;

     
        
  
        return (
            //props
            <div className="display-info-container">
                      
                {listUser.map((user) => {
                    return(
               <div>    
                    {true && <div key = {user.id} className={user.age < 20 ? "red" : "green"}>
                            <div>name: {user.name}</div>
                            <div>age: {user.age}</div>
                             <span onClick={() => {props.handleDeleteUser(user.id)}}><button>xoá</button></span>
                            <hr></hr>
                         </div>  
                         }
                       
                            </div>  
                    )

                } )} 
                </div>
            
        )
    }


export default DisplayInfo;