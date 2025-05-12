import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";

const Department = () => {
    const { departmentId } = useParams();

    const [department, setDepartment] = useState({});
    const fetchDepartment = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/department/getDepartment/${departmentId}`);
            const data = await response.json();
            if( !data.ok)
                alert("Error : " , data.message);
            else
                setDepartment(data.department);
        } catch (error) {
            console.error("Error fetching department:", error);
        }
    }

    useEffect(() => {
        fetchDepartment();
    }, [departmentId]);

    return (
        <div>
            
            <p className="text-3xl text-center m-5 uppercase"> {department.departmentName} department </p>
            <p className="text-center m-5"> {department.tagLine} </p>
            <div className="flex">
                {/* TOTAL IN QUEUE */}
                <div
                    className = "m-5 p-6 bg-blue-800 text-white w-50"
                > 
                    Total in queue : {department.queueMembers?.length || 0}
                </div>

                {/* PATIENTS TREATED */}
                <div
                    className = "m-5 p-6 bg-green-800 text-white w-50"
                >
                    Patients treated : {department.patientsTreated || 0}
                </div>
                {/* AVERAGE WAIT TIME */}
                <div
                    className = "m-5 p-6 bg-yellow-600 text-white w-50"
                >
                    Average Wait time: {department.averageWaitTime || 0}
                </div>

            </div>


            
        </div>
     );
}
 
export default Department;