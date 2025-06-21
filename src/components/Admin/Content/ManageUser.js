import ModelCreateUser from "./ModelCreateUser";





const ManageUser  = (props) => {
    return (
        <div className="manage-user-container">
           <div className="title">Manage User</div>

           <div className="content">
            <button> add user  </button>
            <div className="table">
                table <ModelCreateUser/>
                </div>
           </div>
        </div>
    )
}

export default ManageUser;