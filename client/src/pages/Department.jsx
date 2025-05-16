import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import {UserContext} from "../contexts/UserContext";
import { useContext } from "react";
import Stats from "../pages/Stats";

const Department = () => {
    const { departmentId } = useParams();
    const [fullName , setFullName] = useState("");  
    const [visitReason , setVisitReason] = useState("General Checkup");
    const [priority , setPriority] = useState("normal");
    const [department, setDepartment] = useState({});
    const { user } = useContext(UserContext);

    const [message, setMessage] = useState("");

    // setInterval(() => {
    //     fetchDepartment();
    // }, 15000);

    const sendChat = async (e) => {
        e.preventDefault();
        const chatData = {
            sender: user.firstName,
            text: message,
            senderType: "user",
        };
        if (!message) return;
        try {
            
            const response = await fetch(`http://localhost:4000/api/department/addMessage/${departmentId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(chatData)
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
                
                await fetch(`http://localhost:4000/api/department/addMessage/${departmentId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify( {
                        sender: "system",
                        text: `${fullName} has joined the queue for ${visitReason}`,
                        senderType: "system",
                    })
                });

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
            <Stats department = {department} />

            <div className="flex flex-wrap h-100  ">

                <div className="w-80 bg-white border text-slate-600 m-6 shadow-lg rounded-lg hover:shadow-2xl hover:scale-102 transition-transform duration-200">
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
                <div className="w-80 bg-white border text-slate-600 m-6 shadow-lg rounded-lg hover:shadow-2xl hover:scale-102 transition-transform duration-200">
                    <h2 className="m-4 border-b">
                        <i className="fas fa-users m-2"></i>
                        <p className="text-xl inline-block bold "> Queue Members</p>
                    </h2>
                    <ul>
                        {department.queueMembers?.map(member => (
                            <li key={member.userId} className= {"border-b p-2" + ( member.priority === "emergency" ? " text-red-500" : "")}>
                                <p className="text-center"> {member.fullName} </p>
                                <p className="text-sm text-gray-500 text-center"> for {member.visitReason} </p>
                                
                            </li>
                        ))}
                    </ul>
                </div>

                {/* GROUP CHAT */}
                <div >
                    
                
                    <div className="w-80 bg-white border relative text-slate-600 m-6 shadow-lg rounded-lg hover:shadow-2xl hover:scale-102 transition-transform duration-200" 
                        style={{ height: "350px"}}
                    > 
                        <p className="text-center text-xl m-2"> <i class="fa-solid fa-user-group"></i>Group Chat</p>

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