import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const CompanyCard = ({_id, jobProfile, companyName, location, duration, startDate, stipend, rec_id,  onClick }) => {
    
    const userData = JSON.parse(localStorage.getItem('user'));

    // console.log('userType is ', userData);

    return (    
        <div className="bg-gradient-to-br from-green-100 to-black-200 rounded-lg shadow-md p-6 m-6 w-1/2 border border-gray-300" onClick={onClick}>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{jobProfile}</h2>
            <p className="text-lg font-semibold text-gray-600 mb-2">{companyName}</p>
            <div className="flex items-center text-gray-500 mb-2">
                <span className="material-icons text-base mr-1">⚲</span>
                <p className="text-base">{location}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col">
                    <p className="text-base text-gray-600">Duration</p>
                    <p className="text-lg font-semibold text-gray-800">{duration}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-base text-gray-600">Start Date</p>
                    <p className="text-lg font-semibold text-gray-800">{String(startDate).substring(0, 10)}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-base text-gray-600">Stipend</p>
                    <p className="text-lg font-semibold text-gray-800">{stipend}</p>
                </div>
            </div>
            <Link to={{pathname : `jobs/${_id}` }} className="bg-gradient-to-r from-green-400 to-blue-400 hover:bg-green-700 hover:text-white text-white font-bold py-2 px-4 rounded mt-5 transition duration-300 ease-in-out transform hover:scale-10">View More</Link>
            { userData !== null && userData.userType === 'Recruiter' && userData._id === rec_id ? <Link to={{pathname : `jobApplications/${_id}` }} className=" ml-2 bg-gradient-to-r from-green-400 to-blue-400 hover:bg-green-700 hover:text-white text-white font-bold py-2 px-4 rounded mt-5 transition duration-300 ease-in-out transform hover:scale-10">Find Applications</Link> : null}
        </div>
    );
};

export default CompanyCard;

