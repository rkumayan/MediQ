import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"));
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
    }, []);

    const joinNow = async (departmentId) => {
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
                navigate(`/department/${departmentId}`);
            }
                
            
        } catch (error) {
            console.error("Error joining department:", error);
        }
    }
    return (
        <div>
            
            {user && <p>Hello, {user.firstName}!</p>}
            {!user && <p>Please log in to see your personalized message.</p>}

            <div className="flex">
            
            { departments.length > 0 &&
                departments.map((department) => (                    
                    <div key = {department._id} className="m-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">                        
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                { department.departmentName }
                            </h5>
                        
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            { department.tagLine }
                        </p>
                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                            onClick = { () => joinNow(department._id) }
                            >
                            Join now
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
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