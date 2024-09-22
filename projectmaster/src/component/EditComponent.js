import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { BASE_URL } from '../service/baseurl';
import { editProjectsApi } from '../service/allapis';
import { editUpdateContext } from '../service/ContextShareData';




function EditComponent({ projectData }) {

const {setEditUpdate}=useContext(editUpdateContext)
    const handleClose = () => setShow1(false);
    const handleShow = () => setShow1(true);
    const [project, setProject] = useState({
        title: projectData.title, overView: projectData.overView, languages: projectData.languages,
        website: projectData.website, github: projectData.website, proImg: ""

    })

    const [show1, setShow1] = useState(false);
    const [preview, setPreview] = useState("")
    const [user, setUser] = useState({})
    const [token, setToken] = useState("")


    const setInputs = (e) => {
        const { value, name } = e.target
        setProject({ ...project, [name]: value })
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const { title, overView, languages, github, website, proImg } = project
        if (!title || !overView || !languages || !github || !website) {
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
        else {
            const token = localStorage.getItem("token")
            var reqHeader = {}
            if (preview) {
                var reqHeader = {
                    "access_token": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
            else {
                var reqHeader = {
                    "access_token": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }

            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("overView", overView)
            reqBody.append("languages", languages)
            reqBody.append("website", website)
            reqBody.append("github", github)
            preview ? reqBody.append("proImg", proImg) : reqBody.append("proImg", projectData.proImg)

            const proId = projectData._id
            const result= await editProjectsApi(reqHeader,reqBody,proId)
            console.log(result);

               if(result.status==200){
                setEditUpdate(result.data)
                alert(result.data)
                handleClose()
                setProject({ ...project,title: "", overView: "", languages: "", website: "", github: "", proImg: "" })

               }
               else{
                alert(result.response.data)
               }


        }

    }
    useEffect(() => {


        if (project.proImg) {
            setPreview(URL.createObjectURL(project.proImg))

        }
        else {
            setPreview("")
        }

    }, [project.proImg])
    return (
        <>
            <span onClick={handleShow}>
                <i class="fa-solid fa-pen-to-square  me-2" style={{ color: ' #000000' }}></i>

            </span>
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
                                    <img style={{ width: '100%' }} src={preview ? preview : `${BASE_URL}/uploads/${projectData.proImg}`} alt="" />
                                </label>
                            </Col>
                            <Col>
                                <input value={project.title}  name='title' onChange={(e) => { setInputs(e) }} placeholder='Project Name' className='details p-2' type="text" />
                                <input value={project.languages} name='languages' onChange={(e) => { setInputs(e) }} placeholder='Language Used' className='details p-2' type="text" />

                                <input value={project.github} name='github' onChange={(e) => { setInputs(e) }} placeholder='GitHub Link' className='details p-2' type="text" />

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
                    <Button variant="success" onClick={(e) => { handleUpdate(e) }}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default EditComponent