import React from 'react'
import './Signup.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


function Signup() {

  const [ name , setName] = useState("")
  const [ username , setUsername] = useState("")
  const [ email , setEmail] = useState("")
  const [ dob , setDob] = useState("")
  const [ password , setPassword] = useState("")

  function submitfunc(e){
    e.preventDefault();
    var payload = { name , username , email , dob , password}  
    console.log(payload)


    axios('https://guvi-log.herokuapp.com/signup', {
      method: 'POST',
      headers: {
          "Content-type": "application/json"
      },
      data :payload
    
  })
  .then((res)=>{
    if(res.status === 201){
      window.location.href = "/login"
      alert("registered")
    }
    else {
      alert("Alredy registered")
      window.location.href = "/login"
      

    }
  })
  

  

  
  
  }
  

  return (
    <div className='container'>
      <div className='home-left'>
          <div className='left-content'>
          <Link to="/" className='link'><h1>Register</h1></Link>
            <p>you are now registering to the best  webiste</p>
            <p>Join Our Family</p> 

            
          </div>
        </div>
        <div className='home-right'>
          <div className='right-container'>
          <form onSubmit={submitfunc}>
            <label>Name</label><br/>
            <input type="text" name="name" value={name} onChange={(e)=>{
              setName(e.target.value)
            }} /><br/>
            <label>Username</label><br/>
            <input type="text" name="username" value={username} onChange={(e)=>{
              setUsername(e.target.value)
            }}/><br/>
            <label>Email</label><br/>
            <input type="email" name="email" value={email} onChange={
              (e)=>{
                setEmail(e.target.value)
              }
            } /><br/>
            <label>Date of birth</label><br/>
            <input type="date" name="date" value={dob} onChange={(e)=>{
              setDob(e.target.value)
            }} /><br/>
            <label>Password</label><br/>
            <input type="password" name="password" value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }} /><br/>
            <input type="submit" className='btn' />

              <Link to="/login" className='link'><p>Already a Member</p></Link>


        </form>
            
          
          </div>
        </div>
        
    </div>
  )
}

export default Signup