import { useEffect } from "react";


const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"));
   
    

    return (
        <div>
            
            {user && <p>Hello, {user.firstName}!</p>}
            {!user && <p>Please log in to see your personalized message.</p>}
        </div>
    );
}
 
export default Home;