import React, { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import SideNavbar from '../components/SideNavbar';
import { Link } from 'react-router-dom';

function JobListings() {
    // // State to manage form data
    // const [formData, setFormData] = useState({
    //     jobProfile: '',
    //     companyName: '',
    //     location: '',
    //     duration: '',
    //     startDate: '',
    //     stipend: ''
    // });

    // State to manage list of applied jobs
    // const [appliedJobs, setAppliedJobs] = useState([]);
    // const [refresh, toggleRefresh] = useState(false);

    // // Function to handle form input changes
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5000/getjobs', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    //             const json = await response.json();
    //             console.log(json);
    //             if (json.success) {
    //                 await setAppliedJobs(json.data);
    //                 // console.log(appliedJobs);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData(); // Call the async function

    // }, [], [refresh]);

    // Function to handle form submission
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // Add new job to the list of applied jobs
    //     await setAppliedJobs([...appliedJobs, formData]);
    //     const response = await fetch('http://localhost:5000/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ jobProfile: formData.jobProfile, companyName: formData.companyName, location: formData.location, duration: formData.duration, startDate: formData.startDate, stipend: formData.stipend }) });
    //     const json = await response.json();
    //     if (json.success) {
    //         alert('Added successfully');
    //     } else {
    //         alert('Looks like something is wrong! Try again');
    //     }

    //     // Reset form fields after submission
    //     setFormData({
    //         jobProfile: '',
    //         companyName: '',
    //         location: '',
    //         duration: '',
    //         startDate: '',
    //         stipend: ''
    //     });
    //     // console.log(appliedJobs);
    //     toggleRefresh(!refresh);
    // };

    const [editableData, setEditableData] = useState({
        jobProfile: 'Software Engineer',
        companyName: 'Tech Solutions Inc.',
        location: 'New York, NY',
        duration: '6 months',
        startDate: '2024-05-12',
        stipend: '80000$ / month',
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
        salary: '80,000$ / year',
        perks: 'Health insurance, retirement plan, flexible working hours',
        vacancies: '5',
        aboutCompany: 'Tech Solutions Inc. is a leading technology company specializing in web development and software solutions.'
    });

    const handleChange = (e, field) => {
        const value = e.target.value;
        setEditableData({ ...editableData, [field]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(editableData);
        const response = await fetch('http://localhost:5000/jobs', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobProfile: editableData.jobProfile, companyName: editableData.companyName,
                location: editableData.location, duration: editableData.duration, startDate: editableData.startDate.substring(0, 16),
                stipend: editableData.stipend, aboutTheJob: editableData.aboutTheJob, keyResponsibilities: editableData.keyResponsibilities,
                skillsRequired: editableData.skillsRequired, whoCanApply: editableData.whoCanApply, salary: editableData.stipend,
                perks: editableData.perks, vacancies: editableData.vacancies, aboutCompany: editableData.aboutCompany, rec_id: JSON.parse(localStorage.getItem('user'))._id
            })
        });

        const json = await response.json();
        if (json.success) {
            alert('You successfully added this job application');
            setEditableData({
                jobProfile: 'Software Engineer',
                companyName: 'Tech Solutions Inc.',
                location: 'New York, NY',
                duration: '6 months',
                startDate: '2024-05-12',
                stipend: '80000$ / month',
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
                salary: '80,000$ / year',
                perks: 'Health insurance, retirement plan, flexible working hours',
                vacancies: '5',
                aboutCompany: 'Tech Solutions Inc. is a leading technology company specializing in web development and software solutions.'
            });
        } else {
            alert('Oops! something went wrong');
        }
    }

    return (
        <>
        {localStorage.getItem('session_token') !== null ? <SideNavbar userType={JSON.parse(localStorage.getItem('user')).userType} /> : <NavBar />}
            <div className="absolute font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100">
                <Link to='/'>
                    Back
                </Link>
            </div>
            <div className="flex justify-center items-center bg-gradient-to-br from-blue-100 to-green-100">
                <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg mt-10 mb-10 border border-gray-300">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-semibold mb-6">
                            <input
                                type="text"
                                value={editableData.jobProfile}
                                onChange={(e) => handleChange(e, 'jobProfile')}
                                className='italic justify-center text-center p-2 rounded-md'
                            />
                        </h1>
                        <div className=''>
                            <p className="text-lg text-gray-600">
                                <input
                                    type="text"
                                    value={editableData.companyName}
                                    onChange={(e) => handleChange(e, 'companyName')}
                                    className='justify-center text-center p-2 rounded-md'
                                />
                            </p>
                            <p className="text-lg text-gray-600">
                                <input
                                    type="text"
                                    value={editableData.location}
                                    onChange={(e) => handleChange(e, 'location')}
                                    className='justify-center text-center p-2 rounded-md'
                                />
                            </p>
                            <p className="text-lg text-gray-600">
                                <input
                                    type="text"
                                    value={editableData.duration}
                                    onChange={(e) => handleChange(e, 'duration')}
                                    className='justify-center text-center p-2 rounded-md'
                                />
                            </p>
                            <p className="text-lg text-gray-600">
                                <input
                                    type="date"
                                    value={editableData.startDate}
                                    onChange={(e) => handleChange(e, 'startDate')}
                                    className='justify-center text-center p-2 rounded-md'
                                />
                            </p>
                            <p className="text-lg text-gray-600">
                                <input
                                    type="text"
                                    value={editableData.stipend}
                                    onChange={(e) => handleChange(e, 'stipend')}
                                    className='justify-center text-center p-2 rounded-md'
                                />
                            </p>
                        </div>
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">About the Job:</h2>
                        <textarea
                            className="border border-gray-300 rounded-md px-4 py-2 w-full h-24 "
                            value={editableData.aboutTheJob}
                            onChange={(e) => handleChange(e, 'aboutTheJob')}
                        />
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Key Responsibilities:</h2>
                        <ul className="list-disc list-inside">
                            {editableData.keyResponsibilities.map((responsibility, index) => (
                                <li key={index} className="mb-2">
                                    <input
                                        type="text"
                                        value={responsibility}
                                        onChange={(e) => {
                                            const updatedKeyResponsibilities = [...editableData.keyResponsibilities];
                                            updatedKeyResponsibilities[index] = e.target.value;
                                            handleChange({ target: { value: updatedKeyResponsibilities } }, 'keyResponsibilities');
                                        }}
                                        className='w-1/2 p-2 rounded-md'
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Skills Required:</h2>
                        <ul className="list-disc list-inside">
                            {editableData.skillsRequired.map((skill, index) => (
                                <li key={index} className="mb-2">
                                    <input
                                        type="text"
                                        value={skill}
                                        onChange={(e) => {
                                            const updatedSkillsRequired = [...editableData.skillsRequired];
                                            updatedSkillsRequired[index] = e.target.value;
                                            handleChange({ target: { value: updatedSkillsRequired } }, 'skillsRequired');
                                        }}
                                        className='w-1/2 p-2 rounded-md'
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Who Can Apply:</h2>
                        <textarea
                            className="border border-gray-300 rounded-md px-4 py-2 w-full h-24 "
                            value={editableData.whoCanApply}
                            onChange={(e) => handleChange(e, 'whoCanApply')}
                        />
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Salary:</h2>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full "
                            value={editableData.salary}
                            onChange={(e) => handleChange(e, 'salary')}
                        />
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Perks:</h2>
                        <textarea
                            className="border border-gray-300 rounded-md px-4 py-2 w-full h-24"
                            value={editableData.perks}
                            onChange={(e) => handleChange(e, 'perks')}
                        />
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Vacancies:</h2>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                            value={editableData.vacancies}
                            onChange={(e) => handleChange(e, 'vacancies')}
                        />
                    </div>

                    <div className="border-b-2 border-gray-300 mb-6">
                        <h2 className="text-xl font-semibold mb-2">About the Company:</h2>
                        <textarea
                            className="border border-gray-300 rounded-md px-4 py-2 w-full h-24"
                            value={editableData.aboutCompany}
                            onChange={(e) => handleChange(e, 'aboutCompany')}
                        />
                    </div>

                    <div className="text-center mt-6">
                        <button onClick={handleSubmit} className="bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded">
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default JobListings;
