import React ,{ useState} from "react";
import { Link } from "react-router-dom";
import './Login.css'
import axios from "axios";

function Login() {
  


  const [loginemail , setLoginEmail] = useState("")
  const [loginpassword , setLoginPassword] = useState("")

  function handlelogin(e){
    var payload  = { loginemail , loginpassword}
    e.preventDefault();

    axios('http://localhost:8080/login', {
      method: 'POST',
      headers: {
          "Content-type": "application/json"
      },
      data :payload
    
  }).then((res)=>{
    console.log(res)
    

      if(res.data.success === true){
        window.location.href = '/profile'
        alert("login successful")
      }
      else if (res.data.status === false){
        window.location.href = "/signup"
        alert("login unsuccessful")
      }
    
  })
  
  
  
  }

  return (
    <>  
    <div className='container'>
      
        
      <div className='home-left'>
        <div className='left-content'>
          <Link to="/" className="link"><h1>Login</h1></Link>
          <p>you are logging in to the best  webiste</p>
          

           
          
        </div>
      </div>
      <div className='home-right'>
        <div className='right-container'>
        <form onSubmit={handlelogin}>
        <label>Email</label><br/>
        <input type="email" name="email" value={loginemail} onChange={(e)=>{
          setLoginEmail(e.target.value)
        }} /><br/>
        <label>Password</label><br/>
        <input type="password" name="password" value={loginpassword} onChange={(e)=>{
          setLoginPassword(e.target.value)
        }} /><br/>
        <input type="submit" className="btn"/><br/>

        <Link to="/signup" className="link"><p>Dont have an account? Register</p></Link>

    </form>
          
          
          
          

        </div>
      </div>

  </div>

 
    </>
  );
}

export default Login;