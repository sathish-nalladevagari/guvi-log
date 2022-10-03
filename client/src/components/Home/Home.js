
import './Home.css'
import Image from '../Content/Image'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';








function Home() {
  
  window.onload = function(){
    axios.post("http://localhost:8080/")
    .then((res)=>{
      if (res.data.user === true){
        window.location.href = "/profile";
      }
    })
  }
  
  

  return (
    <>

    <Navbar />
    <div className='container'>
      
        
        <div className='home-left'>
          <div className='left-content'>
            <h1>Welcome to Guvi Website</h1>
            <p>you are visiting the best  webiste</p>

            <p>Join Our Family</p> 
            <div className='btns'>
              <button><Link to="/login" className='link'>Login</Link></button>
              <button><Link to="/signup" className='link'>SignUp</Link></button>
            
              
            </div>
          </div>
        </div>
        <div className='home-right'>
          <div className='right-container'>
            
            <Image/>
            
            

          </div>
        </div>

    </div>


    </>
  )
}

export default Home