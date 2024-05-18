import React from 'react';
// import { FaMapMarkerAlt } from 'react-icons/fa'; // Import location icon

const CompanyCard = ({ jobProfile, companyName, location, duration, startDate, stipend }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6 w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{jobProfile}</h2>
            <p className="text-lg font-semibold text-gray-600 mb-2">{companyName}</p>
            <div className="flex items-center text-gray-500 mb-2">
                {/* <FaMapMarkerAlt className="mr-1" /> */}
                <p className="text-base">⚲ {location}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="flex flex-col">
                    <p className="text-base text-gray-600">Duration:</p>
                    <p className="text-lg font-semibold text-gray-800">{duration} months</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-base text-gray-600">Start Date:</p>
                    <p className="text-lg font-semibold text-gray-800">{String(startDate).substring(0, 16)}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-base text-gray-600">Stipend:</p>
                    <p className="text-lg font-semibold text-gray-800">{stipend}$ / month</p>
                </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">View More</button>
        </div>
    );
};

export default CompanyCard;
