import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {

   const [showDropdown, setShowDropDown] = useState(false);
   const navigate = useNavigate();
   const toggleDropdown = () => {
      setShowDropDown(!showDropdown);
   }
   const session_token = localStorage.getItem('session_token');

   const handleLogout = () => {
      localStorage.clear();
      navigate('/login');
   };

   return (
      <nav className="bg-white shadow-lg p-2 bg-gradient-to-br from-blue-100 to-green-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <div className="flex-shrink-0 mr-9 ">
                  <Link to="/" className="text-gray-800 text-2xl font-semibold hover:text-green-600 transition duration-300">
                     <span className="relative pb-2">Hire<span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></span>Haven</span>
                  </Link>
               </div>

               {/* Demo Options */}
               <div className="hidden md:block ml-6 mr-2">
                  <div className="flex items-center space-x-4">
                     <Link to='/check' className="text-gray-800 hover:text-green-600 transition duration-300 font-medium border-b-2 border-transparent hover:border-green-600 ">Home </Link>
                     <Link to='/companyreviews' className="text-gray-800 hover:text-green-600 transition duration-300 font-medium border-b-2 border-transparent hover:border-green-600">Company Reviews</Link>
                     <Link to='/check' className="text-gray-800 hover:text-green-600 transition duration-300 font-medium border-b-2 border-transparent hover:border-green-600">Salary Stats</Link>
                  </div>
               </div>
               {/* Search Bar */}
               <div className="flex-1 flex justify-center lg:justify-end">
                  <div className="relative w-full lg:w-64 mr-4 "> {/* Added mr-4 for spacing */}
                     <input type="text" placeholder="⌕  Search..." className="bg-gray-100 text-gray-800 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent px-4 py-2 w-full" />
                  </div>
               </div>
               {/* Notification Bell */}
               <div className="flex items-center ml-4 md:ml-0 mr-4 h-7 w-7"> {/* Added mr-4 for spacing */}
                  <button className="text-gray-800 hover:text-gray-900 focus:outline-none">
                     <img src="https://www.svgrepo.com/show/31480/notification-bell.svg" alt="" />
                  </button>
               </div>
               {/* Profile Option */}
               <div className="relative ml-4 md:ml-0">
                  <button onClick={toggleDropdown} className="flex text-sm text-gray-800 border-2 border-gray-600 rounded-full focus:border-green-600">
                     <img className="h-8 w-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnfAxGV-fZxGL9elM_hQ2tp7skLeSwMyUiwo4lMm1zyA&s" alt="Profile" />
                  </button>
                  {showDropdown && !session_token && (
                     <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <Link to="/login" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-green-600 font-semibold transition-colors duration-300 ease-in-out">Log In</Link>
                        <Link to='/signup' className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-green-600 focus:outline-none font-semibold transition-colors duration-300 ease-in-out">Sign Up</Link>
                     </div>
                  )}
                  {showDropdown && session_token && (
                     <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-green-600 font-semibold transition-colors duration-300 ease-in-out">My Profile</Link>
                        <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 hover:text-green-600 focus:outline-none font-semibold transition-colors duration-300 ease-in-out">Logout</button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
}
