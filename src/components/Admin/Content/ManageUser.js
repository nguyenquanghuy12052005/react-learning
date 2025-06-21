import ModelCreateUser from "./ModelCreateUser";
import './ManageUser.scss'
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUser } from "../../../service/ApiService";


const ManageUser  = (props) => {
const [showCreateUser, setShowCreatUser] = useState(false)
const [listUser, setListuser] = useState([]);


    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUser();
      
       if(res.EC === 0 ) {
        setListuser(res.DT);
       }
        
    }

    return (
        <>
        <div className="manage-user-container">
           <div className="title">Manage User</div>

           <div className="content">
            <div className="btn-add-new">
                  <button type="button" className="btn btn-primary" onClick={() => setShowCreatUser(true)}> add user  </button>
            </div>
          
            <div className="table-users-container">
              <TableUser  listUser = {listUser}/>
    
                </div>
                <ModelCreateUser  show = {showCreateUser} setShow = {setShowCreatUser} fetchListUser = {fetchListUser}/>
           </div>
        </div>
        </>
    )
}

export default ManageUser;