import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../service/allapis'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Auth({ register }) {
  const navigate =useNavigate()

  const [unamevalid, setUnameValid] = useState(false)
  const [pswvalid, setPswValid] = useState(false)

  const [emailvalid, setEmailValid] = useState(false)

  // state for user data
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const SetData = (e) => {
    const { name, value } = e.target
    if(name=="username"){
      if(value.match(/^[a-zA-Z .]+$/)){
setUnameValid(false)
      }
      else{
        setUnameValid(true)
      }
    }
    if(name=="email"){
      if(value.match( /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)){
setEmailValid(false)
      }
      else{
        setEmailValid(true)
      }
    }
    if(name=="password"){
      if(value.match(/^[a-zA-Z .0-9@]+$/)){
setPswValid(false)
      }
      else{
        setPswValid(true)
      }
    }
    setUser({ ...user, [name]: value })

  }
 const handleRegister=async(e)=>{
e.preventDefault()
const {username,password,email}=user
if(!username,!password,!email){
  alert("enter all details")
}
else{
  const result = await registerApi(user)
  console.log(result);
  if(result.status==200){
    toast.success(result.data, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    setUser({username: "",email: "", password: ""})
    navigate('/login')


  }
  else{
    toast.error(result.response.data, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
  }
}
  }

  const handleLogin=async(e)=>{
    e.preventDefault()
    const {password,email}=user
    if(!password,!email){
      alert("enter all details")
    }
    else{
      const body={email,password}
      const result = await loginApi(body)
      if(result.status==200){
    // store login details
    localStorage.setItem("currentuser",JSON.stringify(result.data.user))
    localStorage.setItem("token",result.data.token)
        setUser({email: "", password: ""})
        toast.success('Login successfull', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
    navigate('/')

    
      }
      else{
        toast.error(result.response.data, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
      }
    }
      }
  const isRegister = register ? true : false
  return (
    <div>
      <div className='d-flex justify-content-center mt-5 mb-5 ' >
        <Row style={{ width: '600px' }}>
          <Col>
            <Link style={{ textDecoration: 'none' }} to={'/'}>Back to home</Link>
            <img style={{ width: '100%' }} src={isRegister ? "https://i.postimg.cc/J09NzqMM/graphic-cartoon-character-of-online-registration-vector-45954519.jpg" : "https://i.postimg.cc/1tgGDTWD/Login.jpg"} alt="" />
          </Col>
          <Col>
            <h5>{
              isRegister ? "REGISTER" : "LOGIN"}</h5>
            {
              isRegister &&
              <>
                <input value={user.username} name="username" onChange={(e) => SetData(e)} type="text" className='form-control mb-2' placeholder='Username' />
                {unamevalid &&
                  <p className='text-danger text-center'>Invalid Username</p>}
              </>

            }
            
            <input value={user.email} type="text" name="email" onChange={(e) => SetData(e)} className='form-control mb-2' placeholder='Email Address' />
            {emailvalid&&<p className='text-center text-danger'>Enter valid email id </p>}
            <input value={user.password} type="text" name="password" onChange={(e) => SetData(e)} className='form-control' placeholder='Password' />
            {pswvalid&&<p className='text-center text-danger'>Enter valid email id </p>}

            {isRegister ? <button onClick={(e)=>handleRegister(e)} className='button-18 mt-2'>Register</button> : <button onClick={(e)=>{handleLogin(e)}} className='button-18 mt-2'>Login</button>}
            {isRegister ? <p>Already have an account? <Link to={'/login'} style={{ textDecoration: 'none' }}>Login Here</Link></p> :
              <p>New User? <Link to={'/register'} style={{ textDecoration: 'none' }}>Signup Here</Link></p>}
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Auth