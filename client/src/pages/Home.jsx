import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotLoggedIn from "./NotLoggedIn";
const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const doctor = JSON.parse(localStorage.getItem("doctor"));
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    const fetchDepartments = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/department/getDepartments");
            const data = await response.json();
            if( !data.ok)
                alert("Error : " , data.message);
            else
                setDepartments(data.departments);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    }

    useEffect(() => {
        fetchDepartments();
        if(doctor)
            navigate("/doctorDashboard");
    }, []);

    const joinNow = async (departmentId) => {
        navigate(`/department/${departmentId}`);
        return;
        try {
            const response = await fetch("http://localhost:4000/api/department/joinDepartment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({ departmentId, userId: user._id })
            });
            const data = await response.json();
            if( !data.ok)
                alert("Error : " , data.message);
            else{
                
            }
                
            
        } catch (error) {
            console.error("Error joining department:", error);
        }
    }
    return (
        <div>


            {!user && !doctor && <NotLoggedIn />}

            <div className="flex flex-wrap">
            
            { user && departments.length > 0 &&
                departments.map((department) => (                    
                    <div key = {department._id} className="  backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl
                     p-6 max-w-sm  shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer
                     m-10 
                    "
                        style = {{ width: "400px"}}
                    >     
                        
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                            { department.departmentName }
                        </h5>
                        <p className="mb-3 font-normal text-black">
                            { department.tagLine }
                        </p>
                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                            onClick = { () => joinNow(department._id) }
                            >
                            Show More
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </button>
                    
                      
                    </div>
      
                ))
            }   
            </div>


            
        </div>   
    );
}
 
export default Home;