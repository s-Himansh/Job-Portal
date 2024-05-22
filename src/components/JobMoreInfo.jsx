import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import SideNavbar from './SideNavbar'
import Modal from 'react-modal';

function JobMoreInfo() {
    const { jobId } = useParams();
    const [userType, setUserType] = useState('');
    const location = useLocation();
    const currURL = location.pathname;
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const userData = JSON.parse(localStorage.getItem('user'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    // console.log(currURL);

    // Sample data for job details
    const [jobDetails, setJobDetails] = useState({
        jobProfile: 'Software Engineer',
        companyName: 'Tech Solutions Inc.',
        location: 'New York, NY',
        duration: 'Full-time',
        startDate: 'ASAP',
        stipend: '$80,000 - $100,000 per annum',
        aboutTheJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla efficitur mi, nec facilisis risus vestibulum in.',
        keyResponsibilities: [
            'Develop new features for web applications',
            'Collaborate with team members on projects',
            'Debug and troubleshoot issues',
            'Write clean, maintainable code'
        ],
        skillsRequired: [
            'Proficient in JavaScript and React.js',
            'Experience with RESTful APIs',
            'Strong problem-solving skills',
            'Ability to work in a team environment'
        ],
        whoCanApply: 'Candidates with a Bachelor\'s degree in Computer Science or equivalent experience.',
        salary: '$80,000 - $100,000 per annum',
        perks: 'Health insurance, retirement plan, flexible working hours',
        vacancies: '5',
        aboutCompany: 'Tech Solutions Inc. is a leading technology company specializing in web development and software solutions.'
    });

    const [showPopup, setShowPopup] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/login');
    };


    useEffect(() => {
        const fetchJobData = async (jobId) => {
            // console.log('sent id is ', jobId);
            const response = await fetch('http://localhost:5000/getJobDesc', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ jobId }) });
            const json = await response.json();

            if (json.success) {
                setJobDetails(json.jobData);
                // console.log('success it is ');
            }

            const currUserData = JSON.parse(localStorage.getItem('user')).userType;
            setUserType(currUserData);
        }
        fetchJobData(jobId);
        // console.log(jobDetails);

    }, [jobId]);

    // const applyForJob = () => {
    //     // Handle applying for the job
    //     console.log('Applying for job:', jobId);
    // };

    const handleApplyNow = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const response = await fetch('http://localhost:5000/getUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId }) // Pass the user ID as an object
        });
        const json = await response.json();
        // console.log('user data is ', json.userData);
        await formData.append('userData', JSON.stringify(json.userData));
        await formData.append('jobData', JSON.stringify(jobDetails));
        await formData.append('status', "Still Processing");
        await formData.append('resume', resumeFile);


        // console.log(formData);


        try {
            const response = await fetch('http://localhost:5000/submitApplication', {
                method: 'POST',
                body: formData,
            });

            const json = await response.json();

            if (json.success) {
                setIsModalOpen(true);
                console.log('Application submitted successfully!');
            } else {
                alert('Failed to submit application.');
                console.error('Failed to submit application.');
            }

            setShowPopup(false);
        } catch (error) {
            console.error('Error:', error);
        }

    };
    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    const [flag, setFlag] = useState(false);

    useEffect(() => {
        const fetchApplications = async (userId) => {
            const response = await fetch(`http://localhost:5000/getUserApplications/${userId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();

            const shorlistApplications = data.applications;
            // console.log(shorlistApplications);

            shorlistApplications.map((application, index) => {
                if (application.jobData._id === jobDetails._id) {
                    setFlag(true);
                }
            });

        };

        fetchApplications(userId);
    });


    return (
        <>
            {localStorage.getItem('session_token') !== null ? <SideNavbar userType={userType} /> : <NavBar />}
            <div className="absolute font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100">
                {!currURL.includes('applications') && currURL.includes('alljobs') ? <Link to='/alljobs'>Back</Link> : null}
                {currURL.includes('applications') && !currURL.includes('alljobs') ? <Link to='/applications'>Back</Link> : null}
                {!currURL.includes('applications') && !currURL.includes('alljobs') ? <Link to='/'>Back</Link> : null}
            </div>
            <div className="flex justify-center items-center bg-gradient-to-br from-blue-100 to-green-100">
                <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg mt-10 mb-10 border border-gray-300">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-semibold mb-3">{jobDetails.jobProfile}</h1>
                        <p className="text-lg text-lg font-semibold text-gray-600 mb-2">{jobDetails.companyName}</p>
                        <p className="text-lg text-gray-600 mb-2">⚲ {jobDetails.location}</p>
                        <p className="text-lg text-gray-600 mb-2">{jobDetails.duration}</p>
                        <p className="text-lg text-gray-600 mb-2">{String(jobDetails.startDate).substring(0, 10)}</p>
                        <p className="text-lg text-gray-600 mb-2">{jobDetails.stipend}</p>
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">About the Job:</h2>
                        <p className="text-lg">{jobDetails.aboutTheJob}</p>
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Key Responsibilities:</h2>
                        <ul className="list-disc list-inside">
                            {jobDetails.keyResponsibilities.map((responsibility, index) => (
                                <li key={index} className="mb-2">{responsibility}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Skills Required:</h2>
                        <ul className="list-disc list-inside">
                            {jobDetails.skillsRequired.map((skill, index) => (
                                <li key={index} className="mb-2">{skill}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Who Can Apply:</h2>
                        <p className="text-lg">{jobDetails.whoCanApply}</p>
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Salary:</h2>
                        <p className="text-lg">{jobDetails.salary}</p>
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Perks:</h2>
                        <p className="text-lg">{jobDetails.perks}</p>
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Vacancies:</h2>
                        <p className="text-lg">{jobDetails.vacancies}</p>
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">About the Company:</h2>
                        <p className="text-lg">{jobDetails.aboutCompany}</p>
                    </div>

                    <div className="text-center mt-6">
                        {userType !== 'Recruiter' && !flag ?
                            <button onClick={handleApplyNow} className="bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded">
                                Apply Now
                            </button> : null}
                        {userType === 'Job Seeker' && flag ?
                            <button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded">
                                Applied
                            </button> : null}
                    </div>
                </div>
            </div>
            {/* Popup for uploading resume */}
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                    <div className="absolute w-full h-full bg-gray-900 opacity-50 transition-opacity"></div>
                    <div className="relative bg-white rounded-lg shadow-lg w-96 transition-transform transform translate-y-0">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
                                <input type="file" accept=".pdf" onChange={handleFileChange} className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full" />
                                <div className="flex justify-end">
                                    <button onClick={handleClosePopup} className="text-gray-600 font-semibold px-4 py-2 rounded-md mr-2 hover:bg-gray-200 focus:outline-none">
                                        Cancel
                                    </button>
                                    <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
            >
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully</h2>
                    <p className="text-gray-700 mb-6">Have pateince. Let the recruiter review your application</p>
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
}

export default JobMoreInfo;
