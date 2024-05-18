import React, { useEffect, useState } from 'react';
import CompanyCard from '../components/CompanyCard';
import SideNavbar from '../components/SideNavbar';
import { Link } from 'react-router-dom';

function AllJobs() {

    const [formData, setFormData] = useState({
        jobProfile: '',
        companyName: '',
        location: '',
        duration: '',
        startDate: '',
        stipend: ''
    });

    // State to manage list of applied jobs
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [refresh, toggleRefresh] = useState(false);

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/getjobs', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
                const json = await response.json();
                console.log(json);
                if (json.success) {
                    setAppliedJobs(json.data);
                    // console.log(appliedJobs);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the async function

    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add new job to the list of applied jobs
        await setAppliedJobs([...appliedJobs, formData]);
        const response = await fetch('http://localhost:5000/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ jobProfile: formData.jobProfile, companyName: formData.companyName, location: formData.location, duration: formData.duration, startDate: formData.startDate, stipend: formData.stipend }) });
        const json = await response.json();
        if (json.success) {
            alert('Added successfully');
        } else {
            alert('Looks like something is wrong! Try again');
        }

        // Reset form fields after submission
        setFormData({
            jobProfile: '',
            companyName: '',
            location: '',
            duration: '',
            startDate: '',
            stipend: ''
        });
        // console.log(appliedJobs);
        toggleRefresh(!refresh);
    };


    return (
        <div>
            {localStorage.getItem('session_token') !== null ? <SideNavbar userType={JSON.parse(localStorage.getItem('user')).userType} /> : <NavBar />}
            <div className="inline-block font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100">
                <Link to='/'>
                    Back
                </Link>
            </div>
            <div className="m-20">
            <div className="mb-10 text-center">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-4 hover:text-green-600 transition duration-300 italic">Your Job Listings to us</h1>
                    <p className="text-lg text-gray-600">Wonderful work you have done. Keep it up!</p>
                </div>
                {/* Divide the filtered companies into pairs and render each pair */}
                {appliedJobs.reduce((pairs, company, index) => {
                    if (index % 2 === 0) pairs.push([]);
                    pairs[pairs.length - 1].push(
                        JSON.parse(localStorage.getItem('user'))._id === company.rec_id ?
                          <CompanyCard
                            key={index}
                            {...company}
                            onClick={() => handleCardClick(company)} // Pass the handleCardClick function with the company ID

                        /> : []
                    );
                    return pairs;
                }, []).map((pair, index) => (
                    <div key={index} className="flex space-x-4">
                        {pair}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default AllJobs
