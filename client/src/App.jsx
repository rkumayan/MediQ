import {  Routes, Route  } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import './App.css'
import Navbar from "./pages/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Department from "./pages/Department.jsx";
import DocLogin from "./pages/DocLogin.jsx";
import { UserContext } from "./contexts/userContext.js";
import { DoctorContext } from "./contexts/doctorContext.js";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";

function App() {
  const [user , setUser] = useState( JSON.parse(localStorage.getItem("user")) );
  const [doctor , setDoctor] = useState( JSON.parse(localStorage.getItem("doctor")) );

  const logoutUser = () => {
    localStorage.removeItem("user");   
    setUser(null);
  }

  const logoutDoctor = () => {
    localStorage.removeItem("doctor");
    setDoctor(null);
  }

  return (
    <>
      <UserContext.Provider value={{user , logoutUser , setUser}}>
        <DoctorContext.Provider value={{doctor , logoutDoctor , setDoctor}}>          
          <Navbar />        
          <Routes>
            <Route path="/login" element={<Login />}  />
            <Route path="/docLogin" element={<DocLogin />}  />
            <Route path="/doctorDashboard" element={<DoctorDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/department/:departmentId" element={<Department />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </DoctorContext.Provider>
      </UserContext.Provider>

    </>
  )
}

export default App
