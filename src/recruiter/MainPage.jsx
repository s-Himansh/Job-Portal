import React, { useEffect, useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import SideNavbar from '../components/SideNavbar';
import CompanyCard from '../components/CompanyCard';

function MainPage() {

    let session_token = localStorage.getItem('session_token');
    let user_data = localStorage.getItem('user');
    const [userData, setUserData] = useState('');
    useEffect(() => {
        session_token = localStorage.getItem('session_token');
        user_data = localStorage.getItem('user');
        setUserData(JSON.parse(user_data));
    });


    const companies = [
        {
            jobProfile: 'Software Engineer Intern',
            companyName: 'ABC Technologies',
            location: 'San Francisco, CA',
            duration: '3 months',
            startDate: 'June 2024',
            stipend: '$2000 per month',
        },
        {
            jobProfile: 'Data Analyst Intern',
            companyName: 'XYZ Corporation',
            location: 'New York, NY',
            duration: '6 months',
            startDate: 'May 2024',
            stipend: '$2500 per month',
        },
        // Add more company data as needed
    ];



    return (
        <div className=''>
            <div className=''>
                <div className="bg-white-100 max-h-screen">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4 m-5">Welcome {userData !== null ? userData.firstName + ", Recruiter" : 'Guest'}</h1>
                    <p className="text-lg text-gray-600 mb-8 m-5">Explore thousands of job opportunities tailored just for you.</p>
                    <div className="container mx-auto flex">

                        <div className="flex-grow flex ml-5">
                            {/* Card Component: Current Applications */}
                            <div className="bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Job listrings  : 0</h2>
                                {/* Add your current applications content here */}
                            </div>

                            {/* Card Component: Recommended Companies */}
                            <div className="bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Users Applied : 0</h2>
                                {/* Add your recommended companies content here */}
                            </div>

                            {/* Card Component: Ratings */}
                            <div className="bg-gradient-to-r from-green-200 to-green-300 rounded-lg shadow-md p-6 mb-6 w-1/4 m-2">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ratings</h2>
                                {/* Add your ratings content here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
