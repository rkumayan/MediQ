import {useState, useEffect} from "react";
import {DoctorContext} from "../contexts/DoctorContext";
import { useContext } from "react";
import Stats from "../pages/Stats";

const Department = () => {
    const [departmentId,setDepartmentId] = useState(null);
    
    const [department, setDepartment] = useState({});
    const { doctor } = useContext(DoctorContext);

    const [message, setMessage] = useState("");

    // setInterval(() => {
    //     fetchDepartment();
    // }, 15000);

    const addChatToDatabase = async (sender , text , senderType) => {
        if(!text) return;
        try {            
            const response = await fetch(`http://localhost:4000/api/department/addMessage/${departmentId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ sender , text , senderType })
            });
            const data = await response.json();
            if (data.ok === "false") {
                alert("Error: " + data.message);
            } else {                
                setMessage("");
                
                fetchDepartment(); // Refresh department data
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    const sendChat = async (e) => {
        e.preventDefault();
        const chatData = {
            sender: "system",
            text: message,
            senderType: "system",
        };
        addChatToDatabase(sender , message , "system");
        setMessage("");
    }
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

    const fetchDepartmentId = async () => {
        const response = await fetch("http://localhost:4000/api/doctor/getDepartmentId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ doctorId: doctor._id })
        });
        const data = await response.json();
        if (data.ok === "true") {
            setDepartmentId(data.departmentId);
            
        } else {
            alert("Error fetching department ID");
        }
    };

    useEffect(() => {
        // get the department of doctor
        
        fetchDepartmentId();
    }, [doctor._id]);

    useEffect(() => {
        if (departmentId) {
            fetchDepartment();
        }
    }, [departmentId]);

    const removeFromQueue = async (userId , message) => {
        const response = await fetch(`http://localhost:4000/api/department/removeQueueMember`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId , departmentId })
        });
        const data = await response.json();
        if (data.ok === "true") {
            alert("User removed from queue");
            addChatToDatabase("system" , message , "system");
            fetchDepartment();
        } else {
            alert("Error removing user from queue");
        }
    }

    return (
        <div>
            
            <p className="text-3xl text-center m-5 uppercase"> {department.departmentName} department </p>
            <p className="text-center m-5"> {department.tagLine} </p>
            <Stats department = {department} />

            <div className="flex flex-wrap h-100  ">

                

                {/* QUEUE MEMBERS */}
                <div className="w-100 bg-white border text-slate-600 m-6 shadow-lg rounded-lg hover:shadow-2xl hover:scale-102 transition-transform duration-200">
                    <h2 className="m-4 border-b">
                        <i className="fas fa-users m-2"></i>
                        <p className="text-xl inline-block bold "> Queue Members</p>
                    </h2>
                    <ul>
                        {department.queueMembers?.map(member => (
                            <li key={member.userId} className= {"border-b p-2 cursor-pointer " + ( member.priority === "emergency" ? " text-red-500" : "")}>
                                <p className="text-center font-bold"> {member.fullName} </p>
                                <p className="text-sm text-gray-500 text-center"> for {member.visitReason} </p>
                                <div className="flex justify-center">
                                    <button className="border p-2 m-1 cursor-pointer rounded hover:bg-green-600 hover:text-white"
                                        onClick={ () => { removeFromQueue(member.userId , `appointment setted for ${member.fullName}`) } }
                                    > Set Appointment</button>
                                    <button className="border p-2 m-1 cursor-pointer rounded hover:bg-red-600 hover:text-white"
                                        onClick={ () => { removeFromQueue(member.userId , `${member.fullName} removed from queue`) } }
                                    > Remove from queue</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* GROUP CHAT */}
                <div >
                    
                
                    <div className="w-80 bg-white border relative text-slate-600 m-6 shadow-lg rounded-lg hover:shadow-2xl hover:scale-102 transition-transform duration-200" 
                        style={{ height: "350px"}}
                    > 
                        <p className="text-center text-xl m-2"> <i className="fa-solid fa-user-group"></i>Group Chat</p>

                         {department.groupChat?.length > 0 && 
                            <ul style={{ height: "250px", overflowY: "scroll" }}>
                                {department.groupChat.map((message, index) => (
                                    <li key={index} className={" p-2" + (message.senderType === "system" ? " text-red-500" : "")}>                                        
                                        <strong>{message.sender}</strong>: {message.text}
                                    </li>
                                ))}
                            </ul>
                            }
                        
                        <div className="flex items-center space-x-2 max-w-md mx-auto mt-4  absolute bottom-0 left-5">
                          <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                            onClick={sendChat}
                          >
                            <i className="fas fa-paper-plane"></i>
                          </button>
                        </div>
                    </div>
                        
                    
                </div>

            </div>

        </div>
     );
}

export default Department;