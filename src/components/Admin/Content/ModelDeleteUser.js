import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putDeleteUser } from '../../../service/ApiService';
import { toast } from 'react-toastify';

const  ModelDeleteUser =(props) =>  {
  const {show, setShow,dataUpdate} = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 const handleDeleteUser = async() => {
   

let data = await putDeleteUser(dataUpdate.id)
console.log(data);
     if(data && data.EC === 0) {
      toast.success(data.EM)
      handleClose();
     await props.fetchListUser();
     }
     
     
     if(data && data.EC !== 0) {
      toast.error(data.EM)
     }

   }

  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Delete User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelDeleteUser;