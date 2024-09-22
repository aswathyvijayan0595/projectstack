import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import './home.css'
import ProjectCard from '../component/ProjectCard'
import { Link } from 'react-router-dom'
import { getLimitdProjectsApi } from '../service/allapis'



function Home() {
  const [token,setToken]=useState("")
  const [homeProjects,setHomeProjects]=useState([])
  const getProjects =async()=>{
    const result = await getLimitdProjectsApi()
    console.log(result);
    setHomeProjects(result.data)
  }
  useEffect(()=>{
    getProjects()
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))


    }
    else{
setToken("")
    }

  },[])
  return (
    <div>
        <div >
    <div className='container'>
                <Row>
                    <Col className='p-5' lg={6}>
                        <h1 className='header'>PROJECT STACK</h1>
                        <p className='para'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam pariatur nihil officia vitae et reiciendis eum iure, sequi nesciunt. Ad molestiae enim aliquam ratione corporis eum laudantium, quaerat cumque eveniet.
    
                        </p>
                      {token? <Link to={'/dashboard'}><button className='button-33'><i class="fa-solid fa-arrow-left pe-1 pt-2"></i>Explore<i class="fa-solid fa-arrow-right pt-2 ps-1"></i></button></Link>:
                       <Link to={'/login'}> <button className='button-33'>Start</button></Link>
                       }
                    </Col>
                    <Col className='p-0' lg={5}>
                    <img className='' style={{width:"100%"}} src="https://i.postimg.cc/1tCwtvnh/68747470733a2f2f696d616765732e73717561726573706163652d63646e2e636f6d2f636f6e74656e742f76312f35373639.gif" alt="" />
                    </Col>
                </Row>
    </div>
          <div className='pt-5 pb-2' style={{backgroundColor:'#c5ccd6'}}>
            <h2 className='text-center mb-2'>EXPLORE PROJECTS</h2>
      <marquee scrollOver={25}>
                <div className='d-flex justify-content-evenly'>
                    {
                      homeProjects?homeProjects.map(i=>(
                        <ProjectCard></ProjectCard>
                      )):<></>
                    }
                    </div>
                    </marquee>
                    <Link to={'/projects'} className='text-center' style={{textDecoration:'none',color:'black'}}><p>View more projects <i class="fa-solid fa-arrow-right"></i></p></Link>

              </div>
   
        </div>
    </div>
  )
}

export default Home