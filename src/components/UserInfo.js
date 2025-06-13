import React from "react";

class UserInfo extends React.Component {

   state = {
        name: ' ',
        age: '',
        address: ''
    }
    
    handleOnchangeInput = (event)=>{    
this.setState({
    name: event.target.value
})
}

handleOnchangeAge = (event)=>{    
this.setState  ({
    age: event.target.value
})
}
handleOnSubmit = (event) => {
event.preventDefault(); //hàm ngăn load lại trang khi submit
this.props.handleAddUser({
    id: Math.floor((Math.random() * 100) + 1) + '-random',
    name: this.state.name,
    age: this.state.age
});
}

    render() {
        return(
            <div>
                hellll-1 {this.state.name} and {this.state.age} 
             <form onSubmit={(event) => this.handleOnSubmit(event)}>
                <input value={this.state.name} type="text" onChange={(event) => this.handleOnchangeInput(event)}></input>
                <button>summit</button>

                  <input value={this.state.age} type="text" onChange={(event) => this.handleOnchangeAge(event)}></input>
                <button>summit</button>
             </form></div>
        )
    }
}

export default UserInfo;