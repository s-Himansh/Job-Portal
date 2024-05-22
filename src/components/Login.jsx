import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleLogin = async (event) => {
      event.preventDefault();
      const response = await fetch('http://localhost:5000/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const jsonData = await response.json();
      if (jsonData.success) {
         localStorage.setItem('user', JSON.stringify(jsonData.findUser));
         localStorage.setItem('session_token', jsonData.authToken);
         navigate('/');
      } else {
         setIsModalOpen(true);
      }
   };
   const closeModal = () => {
      setIsModalOpen(false);
   };

   useEffect(() => {
      const session_token = localStorage.getItem('session_token');
      if (session_token){
         navigate('/');
      }
   },[]);

   return (
      <>
         <div className="absolute font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100">
            <Link to='/'>
               Back
            </Link>
         </div>
         <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col justify-center py-12 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
               <h2 className="text-center text-3xl font-extrabold text-green-900 mt-4 italic">Enter this world</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
               <div className="bg-opacity-90 py-8 px-6 shadow-lg sm:rounded-lg sm:px-10">
                  <form onSubmit={handleLogin} className="space-y-6">
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email address</label>
                        <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 bg-gray-100 placeholder-white-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md" placeholder="Enter your email" />
                     </div>

                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-800">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-3 py-2 bg-gray-100 placeholder-white-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md" placeholder="Enter your password" />
                     </div>

                     <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign In</button>
                     </div>
                  </form>

                  <div className="mt-6 text-center">
                     <p className="text-base text-gray-800">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-green-500 hover:text-green-600">
                           Sign up
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
               <h2 className="text-2xl font-bold mb-4">OOPS!!!</h2>
               <p className="text-gray-700 mb-6">Please enter valid credentials.</p>
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

export default Login;
