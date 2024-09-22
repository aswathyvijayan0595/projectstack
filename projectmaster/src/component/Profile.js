import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Profile() {
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

  return (
<div>
        <div>
            <h5>MY PROFILE</h5>
                            {
                                <img style={{ width: '100%' }} src="https://i.postimg.cc/8zZWhshS/male-avatar-profile-picture-vector-10211761.jpg" alt="" />
                            }
                            <p>UserName</p>
                            <hr />
                            <p>GitHub</p>
                            <hr />
                            <p>Linkedin</p>
                            <hr />
    
                            <div className='d-flex justify-content-end '> <p onClick={handleShow2} className=' mt-5 btn border'>Edit</p></div>
        </div>
        <Modal className='modal-sm' show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>


    
    
                        <img style={{ width: '100%', height: '200px' }} src="https://i.postimg.cc/8zZWhshS/male-avatar-profile-picture-vector-10211761.jpg" alt="" />
    
                        <input placeholder='User Name' className='details p-2' type="text" />
    
                        <input placeholder='GitHub' className='details p-2' type="text" />
    
                        <input placeholder='Linkedin' className='details p-2' type="text" />




                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleClose2}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

</div>
  )
}

export default Profile