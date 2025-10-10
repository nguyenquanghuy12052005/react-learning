import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaFolderPlus } from "react-icons/fa6";
import axios from 'axios';
const  ModelCreateUser = (props)  => {
const {show, setShow} = props;


  

  
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [userName, setUserName] = useState("");
   const [role, setRole] = useState("USER");
   const [image, setImage] = useState("");
   const [previewIamge, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUserName("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
  }

   const handleUploadImage = (event) => {
    if(event.target && event.target.files && event.target.files[0]){
         setPreviewImage(URL.createObjectURL(event.target.files[0]))  ;
         setImage(event.target.files[0]);
    } else {
        // setPreviewImage("")
    }
      
   }


   const handleCreateUser = async() => {
   //validate


   //call api
  //  let data = {
  //       email: email,
  //       password: password,
  //       username: userName, 
  //       role: role,
  //       userImage: iamge
  //  }
   //console.log(data)
   const form = new FormData();
form.append('email', email);
form.append('password', password);
form.append('username', userName);
form.append('role', role);
form.append('userImage', image);

let res = await axios.post('http://localhost:8081/api/v1/participant', form);
console.log(res);

   }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} size='xl' backdrop='static' className='model-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
  <div className="col-md-6">
    <label  className="form-label">Email</label>
    <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)}/>
  </div>
  <div className="col-md-6">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" value={password}  onChange={(event) => setPassword(event.target.value)}/>
  </div>
  
  <div className="col-md-6">
    <label  className="form-label">User Name</label>
    <input type="text" className="form-control" value={userName}  onChange={(event) => setUserName(event.target.value)}/>
  </div>
  <div className="col-md-4">
    <label  className="form-label">Role</label>
    <select  className="form-select"  onChange={(event) => setRole(event.target.value)} >
      <option  value='USER'>USER</option>
      <option value='ADMIN'>ADMIN</option>
    </select>
  </div>
 
 <div className='col-md-12'>
 <label className='form-label lable-upload' htmlFor='fileUpload'> <FaFolderPlus/> Upload File Image</label>
 <input type='file' hidden id='fileUpload'  onChange={(event) => handleUploadImage(event)}/> 
 </div>
 <div className='col-md-12 img-preview'>
    
    {previewIamge 
    ? <img src={previewIamge}></img>
    : <span>preview Index</span>
     }
   
 </div>

  
</form>
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreateUser()}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModelCreateUser;