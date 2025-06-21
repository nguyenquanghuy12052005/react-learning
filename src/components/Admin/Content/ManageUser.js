import ModelCreateUser from "./ModelCreateUser";
import './ManageUser.scss'
import { useState } from "react";




const ManageUser  = (props) => {
const [showCreateUser, setShowCreatUser] = useState(false)

    return (
        <div className="manage-user-container">
           <div className="title">Manage User</div>

           <div className="content">
            <div className="btn-add-new">
                  <button type="button" class="btn btn-primary" onClick={() => setShowCreatUser(true)}> add user  </button>
            </div>
          
            <div className="table-users-container">
                table 
                </div>
                <ModelCreateUser  show = {showCreateUser} setShow = {setShowCreatUser}/>
           </div>
        </div>
    )
}

export default ManageUser;