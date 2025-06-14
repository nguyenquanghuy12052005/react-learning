import React from "react";
import './DisplayInfo.scss'
import logo from './../logo.svg'

class DisplayInfo extends React.Component {

    state = {
        ShowListUser: true
    }

      handleShowHide = () => {
          this.setState( {
            ShowListUser : !this.state.ShowListUser
          })
            }


    render() {
          const {listUser} = this.props;
  
        return (
            //props
            <div className="display-info-container">
                 <div>
                     <span onClick={() => {this.handleShowHide()}}> {this.state.ShowListUser === true ? "show" : "hide"}</span>
                     <img src={logo}></img>  
                     </div>        
                {listUser.map((user) => {
                    return(
               <div>    
                    {this.state.ShowListUser && <div key = {user.id} className={user.age < 20 ? "red" : "green"}>
                            <div>name: {user.name}</div>
                            <div>age: {user.age}</div>
                             <span onClick={() => {this.props.handleDeleteUser(user.id)}}><button>xoá</button></span>
                            <hr></hr>
                         </div>  
                         }
                       
                            </div>  
                    )

                } )} 
                </div>
            
        )
    }
}

export default DisplayInfo;