import { SignedIn, SignedOut, SignInButton, UserButton , SignUpButton , useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Auth = () => {
    const user = useUser();
    const navigate = useNavigate();
    console.log(user);
    useEffect(() => {
        if( user)   
            navigate('/'); // Redirect to home page if user is logged in
    }, [user]);
    return ( 
        <>        
            <h1>Authentication</h1>
            <p>Please log in to continue.</p>
            <header>
                <SignedOut>
                  <SignInButton> 
                        <button>LogIn</button>
                  </SignInButton> 
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
            </header>
        </>
     );
}
 
export default Auth;