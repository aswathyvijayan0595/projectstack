import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'

function Header() {
  return (
    <div>
        <Navbar className="bg">
        <Container>
          <Navbar.Brand className='d-flex' href="/">
            <img style={{width:'100%',height:'40px'}} src="https://i.postimg.cc/hGxkBG7x/project-app.gif" alt="" />
        {' '}
            <h3 className='head'>PROJECT STACK</h3>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header