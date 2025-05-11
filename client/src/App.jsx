import {  Routes, Route  } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import './App.css'
import Navbar from "./pages/Navbar.jsx";



function App() {

    
  return (
    <>
      
        <Navbar />
        
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        
    </>
  )
}

export default App
