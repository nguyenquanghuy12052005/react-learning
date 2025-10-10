import ModelCreateUser from "./ModelCreateUser";
import './ManageUser.scss'
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUser } from "../../../service/ApiService";
import ModelUpdateUser from "./ModelUpdateUser";
import ModelViewUser from "./ModelViewUser";


const ManageUser  = (props) => {
const [showCreateUser, setShowCreatUser] = useState(false)
const [showUpdateUser, setShowUpdateUser] = useState(false)
const [showViewUser, setShowViewUser] = useState(false)
const [listUser, setListuser] = useState([]);
const [dataUpdate, setDataUpdate] = useState({});

    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUser();
      
       if(res.EC === 0 ) {
        setListuser(res.DT);
       }
        
    }

  const  handleCkickUpdateUser = (user) => {
    setShowUpdateUser(true);
    setDataUpdate(user);
    console.log(user);
    
    }

      const  handleClickViewUser = (user) => {
    setShowViewUser(true);
    setDataUpdate(user);
    console.log(user);
    
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
              <TableUser  listUser = {listUser}
              handleCkickUpdateUser={handleCkickUpdateUser}
              handleClickViewUser = {handleClickViewUser}
              />

                </div>
                <ModelCreateUser  show = {showCreateUser} setShow = {setShowCreatUser} fetchListUser = {fetchListUser}/>
                <ModelUpdateUser  show = {showUpdateUser} setShow = {setShowUpdateUser}  
                                  dataUpdate = {dataUpdate} fetchListUser = {fetchListUser}                             
                                  setDataUpdate = {setDataUpdate}
                />
                <ModelViewUser    show = {showViewUser} setShow = {setShowViewUser}   dataUpdate = {dataUpdate}/>
           </div>
        </div>
        </>
    )
}

export default ManageUser;