import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import NavBar from './NavBar';
import SideNavbar from './SideNavbar';

Modal.setAppElement('#root');

const SignUp = () => {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [userType, setUserType] = useState('');
   const [termsChecked, setTermsChecked] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const navigate = useNavigate();

   const handleSignUp = async (event) => {
      event.preventDefault();

      const response = await fetch('http://localhost:5000/signup', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ firstName, lastName, email, password, userType, termsChecked })
      });
      const jsonData = await response.json();

      if (jsonData.success) {
         setIsModalOpen(true);
      } else {
         alert('Please fill out all the fields and check them properly');
      }
   };

   const closeModal = () => {
      setIsModalOpen(false);
      navigate('/login');
   };

   return (
      <>
         {/* {localStorage.getItem('session_token') !== null ? <SideNavbar userType={JSON.parse(localStorage.getItem('user')).userType} /> : <NavBar />} */}
         <div className="absolute font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100">
            <Link to='/'>
               Back
            </Link>
         </div>
         <div className="max-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col justify-center py-12 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
               <h2 className="text-center text-3xl font-extrabold text-green-900 mt-4 italic">Create an Account</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
               <div className="bg-white bg-opacity-90 py-8 px-16 shadow-lg sm:rounded-lg sm:px-10">
                  <form onSubmit={handleSignUp} className="space-y-6">
                     <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">First name</label>
                        <input id="firstName" name="firstName" type="text" autoComplete="given-name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 w-full px-3 py-2 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md" placeholder="First name" />
                     </div>

                     <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">Last name</label>
                        <input id="lastName" name="lastName" type="text" autoComplete="family-name" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 w-full px-3 py-2 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md" placeholder="Last name" />
                     </div>

                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email address</label>
                        <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md" placeholder="Email" />
                     </div>

                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-800">Password</label>
                        <input id="password" name="password" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-3 py-2 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md" placeholder="Password" />
                     </div>

                     <div>
                        <fieldset>
                           <legend className="block text-sm font-medium text-gray-800">Type of user</legend>
                           <div className="mt-2 space-y-2">
                              <div className="flex items-center">
                                 <input id="employer" name="userType" type="radio" value="Recruiter" checked={userType === 'Recruiter'} onChange={(e) => setUserType(e.target.value)} className="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded accent-green-500" />
                                 <label htmlFor="Recruiter" className="ml-3 block text-sm font-medium text-gray-800">Recruiter</label>
                              </div>
                              <div className="flex items-center">
                                 <input id="student" name="userType" type="radio" value="Job Seeker" checked={userType === 'Job Seeker'} onChange={(e) => setUserType(e.target.value)} className="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded accent-green-500" />
                                 <label htmlFor="Job Seeker" className="ml-3 block text-sm font-medium text-gray-800">Job Seeker</label>
                              </div>
                           </div>
                        </fieldset>
                     </div>

                     <div className="flex items-center">
                        <input id="terms" name="terms" type="checkbox" required checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded accent-green-500" />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-800">
                           I agree to the{' '}
                           <Link to="/terms" className="font-medium text-green-500 hover:text-green-600">
                              Terms and Conditions
                           </Link>
                        </label>
                     </div>

                     <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign up</button>
                     </div>
                  </form>

                  <div className="mt-6 text-center">
                     <p className="text-base text-gray-800">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-green-500 hover:text-green-600">
                           Sign in
                        </Link>
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
         >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
               <h2 className="text-2xl font-bold mb-4">Successfully Registered</h2>
               <p className="text-gray-700 mb-6">You have successfully registered. Please log in to continue.</p>
               <button
                  onClick={closeModal}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
               >
                  Close
               </button>
            </div>
         </Modal>
      </>
   );
};

export default SignUp;
