import React, { useContext, useEffect } from 'react'
import Header from '../component/Header'
import { Col, Row } from 'react-bootstrap'
import MyProjects from '../component/MyProjects'
import './dashboard.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from '../component/Profile'
import { addprojectApi } from '../service/allapis'
import { appUpdateContext } from '../service/ContextShareData'


function DashBoard() {
    const {setAppUpdate}=useContext(appUpdateContext)

    const [preview, setPreview] = useState("")
    const [user, setUser] = useState({})
    const [token, setToken] = useState("")

    const [project, setProject] = useState({
        title: "", overView: "", languages: "", website: "", github: "", proImg: ""
    })
    const setInputs = (e) => {
        const { value, name } = e.target
        setProject({ ...project, [name]: value })
    }

    const [show1, setShow1] = useState(false);


    const handleClose = () => setShow1(false);
    const handleShow = () => setShow1(true);
    const handleAdd =async(e)=>{
        e.preventDefault()
        const {title,overView,languages,github,website,proImg}=project
        if(!title || !overView || !languages || !github || !website || !proImg){
            toast.warn('Enter All Details', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        else{
          const  reqHeader={
            "access_token":`Bearer ${token}`,
            "Content-Type":"multipart/form-data"
          }
          const reqBody= new FormData()
            reqBody.append("title",title)
            reqBody.append("overView",overView)
            reqBody.append("languages",languages)
            reqBody.append("website",website)
            reqBody.append("github",github)
            reqBody.append("proImg",proImg)

           const result = await addprojectApi(reqBody,reqHeader)
           console.log(result);
           if(result.status==200){
            alert(result.data.title +" is added")
            setAppUpdate(result.data)
            handleClose()
            setProject({ ...project,title: "", overView: "", languages: "", website: "", github: "", proImg: "" })

           }
           else{
            alert(result.response.data)
           }

          
        }

    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    },[])
    useEffect(()=>{
        if (localStorage.getItem("currentuser")) {
            setUser(JSON.parse(localStorage.getItem("currentuser")))

        }
    },[])


    useEffect(() => {
        
       
        if (project.proImg) {
            setPreview(URL.createObjectURL(project.proImg))

        }
        else {
            setPreview("")
        }

    }, [project.proImg])
    console.log(token);

    return (
        <div>
            <Header></Header>
            <div className='container mt-5 mb-5'>
                <Row className='justify-content-between'>
                    <Col lg={7}>
                        <div className='box p-3'>
                            <div><h2 className='text-white'>WELCOME {user?.username}</h2>
                                <hr />
                            </div>
                            <div>
                                <div className='d-flex justify-content-between'>
                                    <h4 className='text-white'>MY PROJECTS</h4>
                                    <button onClick={handleShow} className='button-83'>Add projects</button>

                                </div>
                                <MyProjects ></MyProjects>
                                </div>
                        </div>
                    </Col>
                    <Col className='box p-3' lg={4}>
                        <Profile></Profile>
                    </Col>
                </Row>
            </div>



            <Modal show={show1} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col>
                                <label htmlFor='img1' className='text-center'>
                                    <input onChange={(e) => setProject({ ...project, ["proImg"]: e.target.files[0] })} id='img1' style={{ display: 'none' }} type='file' />
                                    <img style={{ width: '100%' }} src={preview ? preview : "https://i.postimg.cc/NfRgGvPv/default.jpg"} alt="" />
                                </label>
                            </Col>
                            <Col>
                                <input name='title' onChange={(e) => { setInputs(e) }} placeholder='Project Name' className='details p-2' type="text" />
                                <input name='languages' onChange={(e) => { setInputs(e) }} placeholder='Language Used' className='details p-2' type="text" />

                                <input name='github' onChange={(e) => { setInputs(e) }} placeholder='GitHub Link' className='details p-2' type="text" />

                                <input name='website' onChange={(e) => { setInputs(e) }} placeholder='Website Link' className='details p-2' type="text" />

                            </Col>
                        </Row>
                        <textarea name='overView' onChange={(e) => { setInputs(e) }} placeholder='Project Overview' className='details  mt-2' id="" cols="50" rows="3"></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={(e)=>{handleAdd(e)}}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />

        </div>
    )
}

export default DashBoard