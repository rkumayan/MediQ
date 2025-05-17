
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext.js";
import {DoctorContext} from "../contexts/doctorContext.js";

import { useState } from "react";


const Navbar = () => {
    const { user, logoutUser } = useContext(UserContext);
    const { doctor , logoutDoctor} = useContext(DoctorContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleSignOut = () => {
        logoutUser();
        setIsModalOpen(false);
        navigate("/login");                
    };
    const handleDoctorSignOut = () => {
        logoutDoctor();
        setIsModalOpen(false);
        navigate("/docLogin");                
    };
    return ( 
        <div className="flex justify-between items-center bg-gray-800 text-white p-4">
            <a href="/"> <h1 className="text-4xl"> MediQ </h1></a>
            
            <nav className="flex space-x-4">
                <a href="/about" className="hover:text-gray-400 p-2 px-4">About</a>
                {user && user.firstName && 
                <div>
                  <button className="uppercase p-2 px-4 bg-amber-600 rounded-full cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                  > 
                      {user.firstName[0]}
                  </button>   
                  {isModalOpen && 
                      <div className="fixed right-0 top-0  bg-opacity-50 z-50">
                      <div className="bg-white text-black rounded-2xl p-6 w-80 shadow-lg">
                        <h2 className="text-lg  font-semibold mb-4">Account Options</h2>
                        <button                            
                          className="w-full text-left px-4 py-2 mb-2 rounded-lg cursor-pointer"
                        >
                          hello, {user.firstName + " " + user.lastName}
                        </button>
                        <button                            
                          className="w-full text-left px-4 py-2 mb-2 rounded-lg cursor-pointer"
                        >
                          Change Username
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 mb-2 hover:bg-gray-100 rounded-lg text-red-600 cursor-pointer"
                          onClick={ () => handleSignOut()}
                        >
                          Sign Out
                        </button>
                        <button                            
                          className="mt-4 text-sm text-gray-500 hover:underline cursor-pointer"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                      </div>
                  }                                        
                </div>                
                }

                {doctor && doctor.firstName &&
                  <div>
                  <button className="uppercase p-2 px-4 bg-amber-600 rounded-full cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                  > 
                      {doctor.firstName[0]}
                  </button>   
                  {isModalOpen && 
                      <div className="fixed right-0 top-0  bg-opacity-50 z-50">
                      <div className="bg-white text-black rounded-2xl p-6 w-80 shadow-lg">
                        <h2 className="text-lg  font-semibold mb-4">Account Options</h2>
                        <button                            
                          className="w-full text-left px-4 py-2 mb-2 rounded-lg cursor-pointer"
                        >
                          hello, {doctor.firstName + " " + doctor.lastName}
                        </button>
                        
                        <button
                          className="w-full text-left px-4 py-2 mb-2 hover:bg-gray-100 rounded-lg text-red-600 cursor-pointer"
                          onClick={ () => handleDoctorSignOut()}
                        >
                          Sign Out
                        </button>
                        <button                            
                          className="mt-4 text-sm text-gray-500 hover:underline cursor-pointer"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                      </div>
                  }                                        
                </div>                
                }



                {!user && !doctor && 
                  <Link to="/login" className="hover:text-gray-400 p-2 px-4">Login</Link>
                }
                {!user && !doctor && 
                  <Link to="/register" className="hover:text-gray-400 p-2 px-4">Register</Link>
                }
            </nav>
        </div>
     );
}
 
export default Navbar;