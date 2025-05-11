import { useEffect } from "react";


const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"));
   
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {user && <p>Hello, {user.firstName}!</p>}
        </div>
    );
}
 
export default Home;