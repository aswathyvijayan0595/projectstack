import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './footer.css'


function Footer() {
  return (
    <div className='footer'>
        <div className='p-5'>
            <Row>
                <Col lg={3}>
                    <h3>PROJECT STACK</h3>
                    <p>Completely Free App to manage all software projects</p>
                </Col>
                <Col lg={3}>
                    <h4>GUIDE</h4>
                    <p>React</p>
                    <p>React bootstrap</p>
                    <p>Router</p>

                </Col>
                <Col lg={3}>
                    <Link style={{textDecoration:'none',color:' #000000'}}><p>Home</p></Link>
                    <Link style={{textDecoration:'none',color:' #000000'}}><p>Login</p></Link>
                    <Link style={{textDecoration:'none',color:' #000000'}}><p>Sign Up</p></Link>
                </Col>
                <Col lg={3}>
                    <input className='form-control' type="text" />
                    <button className='button-14 mt-2'> send</button>
                    <div>
                        <i class="fa-brands fa-github" style={{color:' #000000'}}></i>
                    <i class="fa-brands fa-twitter" style={{color:' #000000'}}></i>
                    <i class="fa-brands fa-facebook" style={{color:' #000000'}}></i>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default Footer