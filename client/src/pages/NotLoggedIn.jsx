import { Link } from "react-router-dom";

const NotLoggedIn = () => {
    return ( 
        <>
            <div className="flex justify-evenly h-screen "
                style = { {backgroundColor :"#89C6BB"}}
            >
                <div className="">
                    <p className="text-6xl mt-35 mb-3"> Stop waiting in </p>
                    <p className="text-5xl mb-15"> Lengthy <span style={{ color: "#D53F8C" }}> Queues.</span> </p>
                    <p>
                        With <span style={{ color: "#D53F8C" }}> MediQ</span> You can stay in queue without being in a queue.
                    </p>
                    {/* BUTTONS FOR LOGIN AND SIGNUP     */}
                    <div className="flex mt-10">
                        <button className=" m-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
                            <Link to="/login">Signin for Patients</Link>
                        </button>
                        <button className="m-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
                            <Link to="/docLogin">Signin for Doctors</Link>
                        </button>
                    </div>

                </div>
                <div className="">
                    <img src="https://cdn.impactmedia.co.uk/wp-content/uploads/2022/01/virtual-queue-blog-header.png"
                        className="w-96 h-96"
                    />
                </div>
                
            </div>
        </>
     );
}
 
export default NotLoggedIn;