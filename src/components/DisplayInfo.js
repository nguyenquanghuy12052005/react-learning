import React from "react";

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
            <div>
                 <div>
                     <span onClick={() => {this.handleShowHide()}}> {this.state.ShowListUser === true ? "show" : "hide"}</span>  
                     </div>        
                {listUser.map((user) => {
                    return(
               <div>    
                    {this.state.ShowListUser && <div key = {user.id} className={user.age < 20 ? "red" : "green"}>
                            <div>name: {user.name}</div>
                            <div>age: {user.age}</div>
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