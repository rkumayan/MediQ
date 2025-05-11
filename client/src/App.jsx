import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth.jsx";
import './App.css'
import Navbar from "./pages/Navbar.jsx";

function App() {


  return (
    <>
      
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>    
    </>
  )
}

export default App
