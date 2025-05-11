import { UserButton } from '@clerk/clerk-react';

const Navbar = () => {
    return ( 
        <div className="flex justify-between items-center bg-gray-800 text-white p-4">
            <a href="/"> <h1 className="text-4xl"> MediaQueue Pro </h1></a>
            
            <nav className="flex space-x-4">
                <a href="/about" className="hover:text-gray-400">About</a>
                <div> <UserButton /> </div>
            </nav>
        </div>
     );
}
 
export default Navbar;