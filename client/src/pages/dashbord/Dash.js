import React, { useState } from 'react'
import './Dash.css'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';




function Dash() {
  window.onload = function(){
    axios.post("http://localhost:8080/profile")
    .then((res)=>{
      console.log(res.data.user)
      if(res.data.user === false){
        window.location.href = "/"; 
      }
    })
  }

  function  handleSubmit(e){
    e.preventDefault();
    setTodos([...todos,{id:uuidv4(),title:task}]);

  }

  function handleLogout(){
    axios.post("http://localhost:8080/logout")
    .then((res)=>{
      console.log(res.data.success)
      if(res.data.success === true){
        window.location.href = "/";
      }
    })
  }
  const [todos , setTodos] = useState([]);
  const [ task , setTask] = useState("")

  function handleDelete({  id }){
    setTodos(todos.filter((todo)=>todo.id !== id));

  };
  return (
    <>
    
      <div className='dash-nav'>
        <ul>
          <li><button className='btn'onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    <div className='dash-container'>
        <div className='details'>
            
            <form onSubmit={handleSubmit}>
              <input type="text" value={task} className="dash-input" onChange={(e)=>{
                setTask(e.target.value)
              }} placeholder='Add Your Task'/>
              <input className='dash-btn' type="submit" value = "ADD"/>

            </form>
            <div className='dash-items'>
              {todos.map((todo)=>(
                <li key={todo.id}>
                  <input type="text" onChange={(e)=>{
                    e.preventDefault();
                  }} value={todo.title} />

                  <button onClick={handleDelete}>delete</button>
                </li>
                
          
              ))}

            </div>
            
        </div>
 
    </div>
    </>
  )
}

export default Dash