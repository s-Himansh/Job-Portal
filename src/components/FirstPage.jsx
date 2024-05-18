import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import SideNavbar from './SideNavbar';
import CompanyCard from './CompanyCard';
import { Link } from 'react-router-dom';

const FirstPage = () => {
   let session_token = localStorage.getItem('session_token');
   let user_data = localStorage.getItem('user');
   const [userData, setUserData] = useState('');
   const [companies, setCompanies] = useState([]);
   const [filteredCompanies, setFilteredCompanies] = useState([]);
   const [filters, setFilters] = useState({
      jobProfile: '',
      companyName: '',
      location: '',
      duration: '',
      startDate: '',
      stipend: ''
   });
   const [appNum, setAppNum] = useState(0);

   useEffect(() => {
      const user_data = localStorage.getItem('user');
      setUserData(JSON.parse(user_data));
   }, []);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch('http://localhost:5000/getjobs', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            const json = await response.json();
            if (json.success) {
               await setCompanies(json.data);
               setFilteredCompanies(json.data);
            }
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      const fetchApplications = async () => {
         if (userData._id !== null) {
            try {
               const response = await fetch(`http://localhost:5000/getUserApplications/${userData._id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
               const data = await response.json();
               setAppNum(data.applications.length);
            } catch (error) {
               console.error('Error fetching applications:', error);
            }
         }
      };

      fetchData();
      fetchApplications();
   }, [userData]);

   const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters({ ...filters, [name]: value });
   };

   useEffect(() => {
      const filtered = companies.filter(company => {
         return Object.keys(filters).every(key => {
            if (filters[key] === '') return true;
            if (typeof company[key] === 'string') {
               return company[key].toLowerCase().includes(filters[key].toLowerCase());
            } else if (typeof company[key] === 'number' && !isNaN(parseFloat(filters[key]))) {
               return company[key] === parseFloat(filters[key]);
            }
            return false;
         });
      });
      setFilteredCompanies(filtered);
   }, [filters, companies]);

   const [selectedJobId, setSelectedJobId] = useState(null);

   const fetchJobId = async (companyData) => {
      try {
         return companyData._id;
      } catch (error) {
         console.error('Error fetching job ID:', error);
         return null;
      }
   };

   const handleCardClick = async (companyData) => {
      const jobId = await fetchJobId(companyData);
      if (jobId) {
         setSelectedJobId(jobId);
      } else {
         console.error('Failed to fetch job ID');
      }
   };

   return (
      <div className='bg-gray-100'>
         <div>
            {session_token !== null && userData !== null ? <SideNavbar userType={userData.userType} /> : <NavBar />}
            <div className="hero bg-gradient-to-r from-blue-500 to-green-500 text-white py-16">
               {userData !== null && userData.userType === 'Job Seeker' ?
                  <div className="container mx-auto text-center">
                     <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
                     <p className="text-xl mb-8">Explore thousands of job opportunities according to your needs</p>
                     {/* <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold">Get Started</button> */}
                  </div> :
                  <div className="container mx-auto text-center">
                     <h1 className="text-4xl font-bold mb-4">Find Your Best Candidate</h1>
                     <p className="text-xl mb-8">Explore thousands of job applications from talent all over the world</p>
                     {/* <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold">Get Started</button> */}
                  </div>}
            </div>
            {userData !== null && userData.userType === 'Job Seeker' && (
               <div className="bg-white-100 max-h-screen">
                  <h1 className="text-3xl font-semibold text-gray-800 mb-4 m-5">Welcome {userData.firstName}</h1>
                  <p className="text-lg text-gray-600 mb-8 m-5">Explore thousands of job opportunities tailored just for you.</p>
                  <div className="container mx-36 flex">
                     <div className="flex-grow flex ml-36">
                        <div className="bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                           <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Applications : {appNum}</h2>
                        </div>
                        <div className="bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                           <h2 className="text-xl font-semibold text-gray-800 mb-4">Offers : {appNum}</h2>
                        </div>
                        <div className="bg-gradient-to-r from-green-200 to-green-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                           <Link to='/companyreviews'><h2 className="text-xl font-semibold text-gray-800 mb-4">Check Ratings</h2></Link>
                        </div>
                     </div>
                  </div>
               </div>
            )}
            {userData !== null && userData.userType === 'Recruiter' && (
               <div className=''>
                  <div className="bg-white-100 max-h-screen">
                     <h1 className="text-3xl font-semibold text-gray-800 mb-4 m-5">Welcome {userData !== null ? userData.firstName + ", Recruiter" : 'Guest'}</h1>
                     <p className="text-lg text-gray-600 mb-8 m-5">Explore thousands of job opportunities tailored just for you.</p>
                     <div className="container mx-36 flex">
                        <div className="flex-grow flex ml-36">
                           <div className="bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                              <h2 className="text-xl font-semibold text-gray-800 mb-4">Companies  : {companies.length}</h2>
                           </div>
                           <div className="bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                              <h2 className="text-xl font-semibold text-gray-800 mb-4">Keep Posting!</h2>
                           </div>
                           <div className="bg-gradient-to-r from-green-200 to-green-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                              <Link to='/companyreviews'><h2 className="text-xl font-semibold text-gray-800 mb-4">Check Ratings</h2></Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}
            {userData === null && (
               <div className="bg-white-100 max-h-screen">
                  <h1 className="text-3xl font-semibold text-gray-800 mb-4 m-5">Welcome Guest</h1>
                  <p className="text-lg text-gray-600 mb-8 m-5">Explore thousands of job opportunities tailored just for you.</p>
                  <div className="container mx-36 flex">
                     <div className="flex-grow flex ml-36">
                        <div className="bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                           <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Companies : {companies.length}</h2>
                        </div>
                        <div className="bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                           <h2 className="text-xl font-semibold text-gray-800 mb-4">Join Now</h2>
                        </div>
                        <div className="bg-gradient-to-r from-green-200 to-green-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                           <Link to='/companyreviews'><h2 className="text-xl font-semibold text-gray-800 mb-4">Check Ratings</h2></Link>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
         <div className="container mx-auto py-8">
            <h1 className="text-3xl font-semibold mb-4 italic text-center">Search Your Preference</h1>
            <div className="flex flex-wrap justify-center items-center space-x-4 bg-white shadow-md p-6 rounded-lg">
               <div className="">
                  <input
                     type="text"
                     name="jobProfile"
                     value={filters.jobProfile}
                     onChange={handleFilterChange}
                     placeholder="Job Profile"
                     className="border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-green-500 focus:outline-none shadow-md hover:shadow-lg transition-shadow"
                  />
               </div>
               <div className="mb-4">
                  <input
                     type="text"
                     name="companyName"
                     value={filters.companyName}
                     onChange={handleFilterChange}
                     placeholder="Company Name"
                     className="border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-green-500 focus:outline-none shadow-md hover:shadow-lg transition-shadow"
                  />
               </div>
               <div className="mb-4">
                  <input
                     type="text"
                     name="location"
                     value={filters.location}
                     onChange={handleFilterChange}
                     placeholder="Location"
                     className="border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-green-500 focus:outline-none shadow-md hover:shadow-lg transition-shadow"
                  />
               </div>
               <div className="mb-4">
                  <input
                     type="text"
                     name="duration"
                     value={filters.duration}
                     onChange={handleFilterChange}
                     placeholder="Duration"
                     className="border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-green-500 focus:outline-none shadow-md hover:shadow-lg transition-shadow"
                  />
               </div>
               <div className="mb-4">
                  <input
                     type="date"
                     name="startDate"
                     value={filters.startDate}
                     onChange={handleFilterChange}
                     placeholder="Start Date"
                     className="border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-green-500 focus:outline-none shadow-md hover:shadow-lg transition-shadow"
                  />
               </div>
               <div className="mb-4">
                  <input
                     type="number"
                     name="stipend"
                     value={filters.stipend}
                     onChange={handleFilterChange}
                     placeholder="Stipend"
                     className="border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-green-500 focus:outline-none shadow-md hover:shadow-lg transition-shadow"
                  />
               </div>
            </div>
         </div>

         <div className="m-20">
            {filteredCompanies.reduce((pairs, company, index) => {
               if (index % 2 === 0) pairs.push([]);
               pairs[pairs.length - 1].push(
                  <CompanyCard
                     key={index}
                     {...company}
                     onClick={() => handleCardClick(company)}
                  />
               );
               return pairs;
            }, []).map((pair, index) => (
               <div key={index} className="flex space-x-4">
                  {pair}
               </div>
            ))}
         </div>
         <div className="bg-white py-16">
            <div className="container mx-auto text-center">
               <h2 className="text-3xl font-semibold mb-6"> Signing in won't be in vain</h2>
               <div className="flex justify-center space-x-4">
                  <div className="bg-gray-200 rounded-lg p-6 w-1/4 shadow-md">
                     <h3 className="text-xl font-semibold mb-4">Verified Jobs</h3>
                     <p className="text-gray-700">We provide verified job listings from trusted companies.</p>
                  </div>
                  <div className="bg-gray-200 rounded-lg p-6 w-1/4 shadow-md">
                     <h3 className="text-xl font-semibold mb-4">Easy Application</h3>
                     <p className="text-gray-700">Apply for jobs with just a few clicks.</p>
                  </div>
                  <div className="bg-gray-200 rounded-lg p-6 w-1/4 shadow-md">
                     <h3 className="text-xl font-semibold mb-4">Career Guidance</h3>
                     <p className="text-gray-700">Get tips and advice to enhance your career.</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
               <p>&copy; 2024 HireHaven. All rights reserved.</p>
            </div>
         </div>
      </div>
   );
};

export default FirstPage;
