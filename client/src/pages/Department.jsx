import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import {UserContext} from "../contexts/UserContext";
import { useContext } from "react";

const Department = () => {
    const { departmentId } = useParams();
    const [fullName , setFullName] = useState("");  
    const [visitReason , setVisitReason] = useState("General Checkup");
    const [priority , setPriority] = useState("normal");
    const [department, setDepartment] = useState({});
    const { user } = useContext(UserContext);

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

    const addQueueMember = async (e) => {
        e.preventDefault();

        const patientData = {
            fullName,
            visitReason,
            priority,
            userId: user._id,
            departmentId: departmentId,
        };
        
        
        try {
            const response = await fetch(`http://localhost:4000/api/department/joinDepartment/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patientData)
            });
            const data = await response.json();
            console.log( data);
            if (data.ok === "false") {  
                alert("Error: " + data.message);
            } else {
                alert("Patient joined successfully!");
                fetchDepartment(); // Refresh department data
                // Reset form fields
                setFullName("");
                setVisitReason("General Checkup");
                setPriority("normal");
            }
        } catch (error) {
            console.error("Error registering patient:", error);
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

            <div className="flex">
                <div className="w-80 border text-slate-600 m-6">
                    {/* FORM TO TO ADD USER TO THE QUEUE */}
                <form >
                    <h2 className=" m-4">
                        <i className="fas fa-user-plus m-2 "></i>
                         <p className = "text-xl inline-block bold"> Patient Registration</p>
                    </h2>

                    <div className="mx-5 my-2">
                        <label><i className="fas fa-user "></i> Full Name</label>
                        <input type="text" id="patientName" placeholder="Enter patient's full name" 
                            className="block border border-slate-500 mx-5 my-1 w-60"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                    </div>
                    <div className="mx-5 my-2">
                        <label ><i className="fas fa-notes-medical"></i> Reason for Visit</label>
                        <select id="visitReason" className="block border border-slate-500 mx-5 my-1 w-60"
                            value={visitReason}
                            onChange={(e) => setVisitReason(e.target.value)}
                        >
                            <option value="General Checkup">General Checkup</option>
                            <option value="Injury">Injury</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Emergency">Emergency</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mx-5 my-2">
                        <label><i className="fas fa-exclamation-triangle"></i> Priority Level</label>
                        <div className="">
                            <p className= {"priority-option normal px-3 py-1 m-2 rounded cursor-pointer inline-block border"
                                + (priority === "normal" ? " text-white bg-green-500" : " text-slate-600 bg-white")}
                                onClick={() => {
                                    setPriority("normal");
                                }}
                            >
                                <span><i className="fas fa-walking"></i> Normal</span>
                            </p>
                            <p className= {"priority-option emergency px-3 py-1 m-2 rounded cursor-pointer inline-block border"
                                + (priority === "emergency" ? " text-white bg-red-500" : " text-slate-600 bg-white")}
                                onClick={() => {
                                    setPriority("emergency");
                                }}
                            >
                                <span><i className="fas fa-ambulance"></i> Emergency</span>
                            </p>
                        </div>
                    </div>
                    
                    <button  className="p-3 bg-blue-500 text-white rounded mx-5 my-2 w-60 cursor-pointer"
                        type="submit" onClick={addQueueMember}>
                        <i className="fas fa-plus-circle"></i> Add to Queue
                    </button>                        
                    
                </form>
                </div>  

                {/* QUEUE MEMBERS */}
                <div className="w-80 border text-slate-600 m-6">
                    <h2 className="m-4">
                        <i className="fas fa-users m-2"></i>
                        <p className="text-xl inline-block bold"> Queue Members</p>
                    </h2>
                    <ul>
                        {department.queueMembers?.map(member => (
                            <li key={member.userId} className="border-b p-2">
                                {member.fullName} - {member.visitReason} (Priority: {member.priority})
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
     );
}

export default Department;