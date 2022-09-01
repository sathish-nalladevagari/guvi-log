import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dash from './pages/dashbord/Dash';


function App() {
  return (
    <>
    <BrowserRouter>
    
      
    <div className="App">
      
      
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/signup' exact element={<Signup/>}/>
        <Route path = "/profile" exact element={<Dash/>}/>

      </Routes>
      

     



     
      
    </div>

      

    </BrowserRouter>
    </>
  );
}

export default App;
