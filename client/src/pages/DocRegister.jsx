import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DoctorContext } from "../contexts/doctorContext.js";
import { useNavigate } from "react-router-dom";

const DocRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");
    const [tagLine, setTagLine] = useState("");
    const [averageWaitTime , setAverageWaitTime] = useState("");

    const { setDoctor } = useContext(DoctorContext);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();                                
        try {
            const doctor = { email , password , firstName , lastName , specialization : department };
            const response = await fetch("https://mediq-m56u.onrender.com/api/doctor/addDoctor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(doctor),
            });

            const doctorData = await response.json();
            if( doctorData.ok === 'true' ){
                try{
                    const departmentDetails = { departmentName: department , doctor: doctorData.doctor._id ,  tagLine , averageWaitTime };
                    const response = await fetch("https://mediq-m56u.onrender.com/api/department/createDepartment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(departmentDetails),
                    });
                    const data = await response.json();
                    if( data.ok === 'true' ){
                        localStorage.setItem("doctor", JSON.stringify(doctorData.doctor));
                        setDoctor(doctorData.doctor);
                        navigate("/doctorDashboard");
                    } else {
                        alert( data.message)
                    }
                }
                catch( error ){
                    console.log( "error creating department" , error);
                }
                
            } else {
                alert(doctorData.message);
            }            
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div>
            
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create your account [for doctors]</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit= {handleSubmit}>
                                
                        <div>
                            <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">First Name</label>
                            <div className="mt-2">
                                <input type="text" name="firstName" id="firstName" required 
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                    value = {firstName}
                                    onChange = {(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </div> 
                        <div>
                            <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">Last Name</label>
                            <div className="mt-2">
                                <input type="text" name="lastName" id="lastName"  required 
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                    value = {lastName}
                                    onChange = {(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div> 

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input type="email" name="email" id="email" required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* PASSWORD */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor  ="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                
                            </div>
                            <div className="mt-2">
                                <input type="password" name="password" id="password"  required
                                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                    value = {password}
                                    onChange = {(e) => setPassword(e.target.value)}
                                 />
                            </div>
                        </div>

                        {/* DEPARTMENT/SPECIALIZATION */}
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Department / Specialization</label>
                            <div className="mt-2">
                                <input type="text" name="department" id="department" required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* TAGLINE FOR DEPARTMENT */}
                        <div>
                            <label htmlFor="tagLine" className="block text-sm/6 font-medium text-gray-900">Tagline for Department</label>
                            <div className="mt-2">
                                <input type="text" name="tagLine" id="tagLine" required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    value={tagLine} 
                                    onChange={(e) => setTagLine(e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm/6 text-gray-500">A short description of the department</p>
                        </div>

                        {/* AVERAGE WAIT TIME */}
                        <div >
                            <label htmlFor="averageWaitTime" className="block text-sm/6 font-medium text-gray-900">Average Wait Time(in minutes) </label>
                            <div className="mt-2 mb-4">
                                <input type="number" name="averageWaitTime" id="averageWaitTime" required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    value={averageWaitTime} 
                                    onChange={(e) => setAverageWaitTime(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleSubmit}
                            >Sign in</button>
                        </div>
                    </form>
                    
                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already a registered user
                        <Link to="/doclogin" className="font-semibold text-indigo-600 hover:text-indigo-500"> Login here </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DocRegister;