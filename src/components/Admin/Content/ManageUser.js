import ModelCreateUser from "./ModelCreateUser";
import './ManageUser.scss'




const ManageUser  = (props) => {
    return (
        <div className="manage-user-container">
           <div className="title">Manage User</div>

           <div className="content">
            <button> add user  </button>
            <div className="table">
                table 
                </div>
                <ModelCreateUser/>
           </div>
        </div>
    )
}

export default ManageUser;