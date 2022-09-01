import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'



function Navbar() {

  return (
    <div className='nav-container'>
        <div className='nav-left'>
            
              <Link to="/" className='link'><h1>Guvi</h1></Link>
            
        </div>
        <div className='nav-right'>
          <ul>
            <li><Link to="/login" className='link'> Login</Link></li>
            <li><Link to="/signup" className='link'> SignUp</Link></li>
          </ul>
        </div>
 

    </div>
  )
}

export default Navbar