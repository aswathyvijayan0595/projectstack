import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import ProjectCard from '../component/ProjectCard'
import { getAllProjectsApi } from '../service/allapis'
import { Col, Row } from 'react-bootstrap'

function AllProjects() {
  const [totalProjects,setTotalProjects]=useState([])
  const getProjects=async()=>{
    const result= await getAllProjectsApi()
    console.log(result);
    setTotalProjects(result.data)
  }
  useEffect(()=>{
    getProjects()
  },[])
  console.log(totalProjects);
  return (
    <div>
        <Header></Header>
        <div className='mt-5 mb-5'>
           <div className=' d-flex justify-content-center'> <input placeholder='Search project by technology used...'
            size="sm" type="text" className='form-control form-control-sm w-75 shadow-lg' /></div>


        </div>
        <div className='container ms-4 mb-5'>
      <Row>
            {
              totalProjects?.map(i=>(
                <Col className="m-3"><ProjectCard project={i}></ProjectCard></Col>
  
              ))
            }
      </Row>
        </div>
    </div>
  )
}

export default AllProjects