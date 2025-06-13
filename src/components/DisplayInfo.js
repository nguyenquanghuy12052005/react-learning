import React from "react";

class DisplayInfo extends React.Component {
    render() {
          const {listUser} = this.props;
          console.log(listUser);
          
        return (
            //props
          
            <div>
                {listUser.map((user) => {
                    return (
                         <div key = {user.id}>
                            <div>name: {user.name}</div>
                            <div>age: {user.age}</div>
                            <hr></hr>
                         </div>
                         
                    )
                } )} 
                {/* <div>Name: {name}</div>
                <div>Age: {age}</div> */}
                
                
                </div>
            
        )
    }
}

export default DisplayInfo;