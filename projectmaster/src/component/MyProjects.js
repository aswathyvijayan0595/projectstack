import React, { useContext, useEffect, useState } from 'react'
import { deleteProjectApi, getUserProjectsApi } from '../service/allapis'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import EditComponent from './EditComponent';
import { appUpdateContext, editUpdateContext } from '../service/ContextShareData';






function MyProjects() {
  const {editUpdate}=useContext(editUpdateContext)
const {appUpdate}=useContext(appUpdateContext)
const [userProjects,setuserProjects]=useState([])

const getUserProjects=async()=>{
  if(localStorage.getItem("token")){
    const token = localStorage.getItem("token")
    const reqHeader={
      "access_token":`Bearer ${token}`,
      "Content-type":"application/json"
    }

    const result = await getUserProjectsApi(reqHeader)
    setuserProjects(result.data)
    console.log(result.data);

  }
}
const handleDelete=async(id)=>{
  console.log(id);
//   const result = await deleteProjectApi(id)
// console.log(result);

}
useEffect(()=>{
  getUserProjects()
},[appUpdate,editUpdate])
  return (
<div>
  {
    userProjects?userProjects.map(i=>(
      <div className='shadow p-3 mb-5 bg-white rounded'>
          <div className='d-flex justify-content-between'>
              <h5>
                  {i.title}
              </h5>
              <div className='d-flex'>
<EditComponent projectData={i}></EditComponent>
             <Link to={i.website}> <i class="fa-solid fa-link me-2" style={{color:' #000000'}}></i></Link>
              <i onClick={()=>handleDelete(i._id)} class="fa-solid fa-trash me-2 btn" style={{color:' #000000'}}></i>
             <Link to={i.github}> <i class="fa-brands fa-github" style={{color:' #000000'}}></i></Link>
  
  
              </div>
  
          </div>
      </div>

    )):      <p className='text-white'>No Projects Uploaded</p>

  }




</div>
  )
}

export default MyProjects