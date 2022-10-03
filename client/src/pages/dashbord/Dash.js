import React from 'react'
import './Dash.css'
import axios from 'axios'
import { useEffect } from 'react'




function Dash() {
  useEffect(() => {
    axios.post("http://localhost:8080/profile")
    .then((res)=>{
      console.log(res.data.user)
      if(res.data.user === false){
        window.location.href = "/"; 
      }
    })
    
  
    
  }, [])
  

  function handleLogout(){
    axios.post("http://localhost:8080/logout")
    .then((res)=>{
      console.log(res.data.success)
      if(res.data.success === true){
        window.location.href = "/";
      }
    })
  }
  return (
    <div className='dash-container'>
      <div className='dash-nav'>
        <ul>
          <li><button className='btn'onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
        <div className='details'>
            <h1>
                Hello ,
                Welcome to Guvi profile page
            </h1>
            
        </div>

    </div>
  )
}

export default Dash