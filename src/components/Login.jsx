import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();


   const handleLogin = async (event) => {
      event.preventDefault();
      const response = await fetch('http://localhost:5000/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const jsonData = await response.json();
      if (jsonData.success) {
         localStorage.setItem('user', JSON.stringify(jsonData.findUser));
         localStorage.setItem('session_token', jsonData.authToken);
         navigate('/');
      } else {
         alert('Please enter valid credentials');
      }
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
      </>
   );
};

export default Login;
