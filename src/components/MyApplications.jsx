import React, { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import SideNavbar from './SideNavbar';
import { Link, useParams } from 'react-router-dom';

function MyApplications() {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    console.log('user id is ', userId);
    const [applications, setApplications] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { jobId } = useParams();

    useEffect(() => {
        fetchApplications(userId);
    }, [userId]);

    const fetchApplications = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/getUserApplications/${userId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            // console.log(data);
            setApplications(data.applications);
            console.log(data.applications);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    // Filter applications based on search query
    const filteredApplications = applications.filter(application =>
        application.jobData.jobProfile.toLowerCase().includes(searchQuery.toLowerCase())
    );



    return (
        <div className='bg-gradient-to-br from-blue-100 to-green-100 min-h-screen'>
            <div className="absolute font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100">
                <Link to='/'>
                    Back
                </Link>
            </div>
            <div className="max-w-5xl m-auto py-8">
                {localStorage.getItem('session_token') !== null ? <SideNavbar userType={JSON.parse(localStorage.getItem('user')).userType} /> : <NavBar />}
                <h1 className="text-3xl font-semibold mb-4">My Applications</h1>
                <div className="flex items-center mb-4">
                    <svg className='md:font-bold' xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    <input
                        type="text"
                        placeholder=" Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ml-3 border border-gray-300 rounded-md py-2 px-4 w-64 focus:outline-none"
                    />
                </div>
                <p className="text-lg mb-4">User ID: {userId}</p>
                <ul>
                    {filteredApplications.map((application, index) => (
                        <li key={index} className="mb-8 flex justify-center items-center">
                            <div className="bg-gray-100 p-6 pt-10 rounded-lg shadow-md text-center min-h-[270px]">
                                <p className="text-xl font-semibold mb-2">Job Profile: {application.jobData.jobProfile}</p>
                                {/* Add a link to download the PDF file */}
                                {application.resumePath && (
                                    <a href={`http://localhost:5000/${application.resumePath}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded inline-block mt-2">Download Resume</a>
                                )}
                                <p className="text-xl font-semibold mb-2 mt-6">Status : {application.status} </p>
                                {application.status === 'Accepted' ? <Link to={`chatSection/${application.jobData.rec_id}/${application.userData._id}/${application._id}`} className="bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded inline-block mt-2">Chat with Recruiter</Link> : null}
                            </div>
                            <CompanyCard key={index} {...application.jobData} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MyApplications;
