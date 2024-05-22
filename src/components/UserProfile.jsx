import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import NavBar from './NavBar';

function UserProfile(props) {
   const [editableData, setEditableData] = useState({
      firstName: 'Himanshu',
      lastName: 'Sharma',
      email: 'sharma2003hs134@gmail.com',
      password: '********',
      userType: 'Job Seeker'
   });
   const [userId, setUserId] = useState('');
   const location = useLocation();
   const { userType } = location.state || {};

   useEffect(() => {
      setUserId(JSON.parse(localStorage.getItem('user'))._id);
   }, []);

   useEffect(() => {
      if (userId) {
         findUserData(userId);
      }
   }, [userId]);

   const findUserData = async (userId) => {
      try {
         const response = await fetch('http://localhost:5000/getUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId })
         });
         const json = await response.json();
         if (json.success) {
            setEditableData(json.userData);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   useEffect(() => {
      const updateUser = async (editableData) => {
         const response = await fetch('http://localhost:5000/updateUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, ...editableData })
         });

         const json = await response.json();
         localStorage.removeItem('user');
         localStorage.setItem('user', JSON.stringify(editableData));
      };

      updateUser(editableData);
   }, [editableData, userId]);

   const handleChange = (e, field) => {
      const value = e.target.value;
      setEditableData({ ...editableData, [field]: value });
   };

   return (
      <>
         {localStorage.getItem('session_token') !== null ? (
            <SideNavbar userType={JSON.parse(localStorage.getItem('user')).userType} />
         ) : (
            <NavBar />
         )}
         <div className="absolute font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100 transition duration-300">
            <Link to='/'>
               Back
            </Link>
         </div>
         <div className="bg-gradient-to-br from-blue-200 to-green-200 min-h-screen flex justify-center items-center">
            <div className="container mx-auto p-8 flex justify-center items-center">
               <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
                  <h1 className="text-4xl font-bold mb-8 text-center italic text-black-700 transition duration-300 hover:text-green-600">Edit User Profile</h1>
                  {/* Input fields */}
                  <div className="mb-6">
                     <label className="block mb-2 font-medium text-gray-700">First Name:</label>
                     <input
                        type="text"
                        value={editableData.firstName}
                        onChange={(e) => handleChange(e, 'firstName')}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-400 transition duration-300"
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block mb-2 font-medium text-gray-700">Last Name:</label>
                     <input
                        type="text"
                        value={editableData.lastName}
                        onChange={(e) => handleChange(e, 'lastName')}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-400 transition duration-300"
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block mb-2 font-medium text-gray-700">Email:</label>
                     <input
                        type="email"
                        value={editableData.email}
                        onChange={(e) => handleChange(e, 'email')}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-400 transition duration-300"
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block mb-2 font-medium text-gray-700">Password:</label>
                     <input
                        type="password"
                        value={editableData.password}
                        onChange={(e) => handleChange(e, 'password')}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-400 transition duration-300"
                        readOnly
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block mb-2 font-medium text-gray-700">I am a:</label>
                     <input
                        type="text"
                        value={editableData.userType}
                        onChange={(e) => handleChange(e, 'userType')}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-400 transition duration-300"
                        readOnly
                     />
                  </div>
                  {/* Add more input fields here */}
                  <div className="text-center">
                     <button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-gradient-to-r from-green-500 to-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105">
                        EDIT PROFILE
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default UserProfile;
