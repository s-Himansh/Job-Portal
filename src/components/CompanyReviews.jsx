import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import NavBar from './NavBar';

const mockCompanies = [
    {
        id: 1,
        jobProfile: 'Software Engineer',
        companyName: 'Tech Innovators',
        location: 'San Francisco, CA',
        reviews: [
            { user: 'John Doe', rating: 4, review: 'Great company to work with, excellent team and projects.' },
            { user: 'Jane Smith', rating: 5, review: 'Amazing work culture and opportunities for growth.' },
            { user: 'Alice Johnson', rating: 3, review: 'Good work-life balance but salary could be better.' }
        ]
    },
    {
        id: 2,
        jobProfile: 'Data Scientist',
        companyName: 'Data Corp',
        location: 'New York, NY',
        reviews: [
            { user: 'Bob Brown', rating: 5, review: 'Fantastic place to work, great projects.' },
            { user: 'Charlie White', rating: 4, review: 'Very good work environment and supportive colleagues.' }
        ]
    },
    // Add more companies as needed
];



function CompanyReviews() {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [newReview, setNewReview] = useState({ user: '', rating: 0, review: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [allCompanies, setAllCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async() => {
            const response = await fetch('http://localhost:5000/getJobs', { method : 'GET', headers : {'Content-Type' : 'application/json'} });
            const data = await response.json();
            if (data.success){
                setAllCompanies(data.data);
            }
        };

        fetchCompanies();
    });

    const handleMoreInfo = (company) => {
        setSelectedCompany(company);
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleReviewSubmit = async() => {
        if (selectedCompany && newReview.user && newReview.rating && newReview.review) {
            const updatedCompany = {
                ...selectedCompany,
                reviews: [...selectedCompany.reviews, newReview]
            };
            setSelectedCompany(updatedCompany);
            setNewReview({ user: '', rating: 0, review: '' });
            // console.log('Updated companies data:', updatedCompany); // Replace this with API call to save review
            // console.log('came');
            const response = await fetch('http://localhost:5000/updateReviews', { method : 'POST', headers : { 'Content-Type' : 'application/json' }, body : JSON.stringify(updatedCompany) });
        }
    };

    const calculateAverageRating = (reviews) => {
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (total / reviews.length).toFixed(1);
    };

    const filteredCompanies = allCompanies.filter(company =>
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gradient-to-br from-blue-100 to-green-100 min-h-screen">
            {localStorage.getItem('session_token') !== null ? <SideNavbar userType={JSON.parse(localStorage.getItem('user')).userType} /> : <NavBar />}
            <div className="absolute font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100 transition duration-300">
                {selectedCompany !== null ?
                    <button onClick={() => setSelectedCompany(null)}>
                        Back
                    </button> :
                    <Link to='/'>
                        Back
                    </Link>}
            </div>

            <div className="container mx-auto px-4 py-8">
                <input
                    type="text"
                    placeholder="Search Company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="absolute top-0 right-0 mt-5 mr-5 w-1/5 p-2 border border-gray-300 rounded"
                />

                {!selectedCompany ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
                        {filteredCompanies.map((company) => (
                            <div key={company._id} className="bg-white shadow-lg rounded-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">{company.jobProfile} at {company.companyName}</h2>
                                <p className="text-gray-700 mb-2"><strong>Location:</strong> {company.location}</p>
                                <p className="text-gray-700 mb-2"><strong>Average Rating:</strong> {calculateAverageRating(company.reviews)} ⭐</p>
                                <button
                                    className="text-green-600 hover:text-green-800 transition duration-300 font-semibold"
                                    onClick={() => handleMoreInfo(company)}
                                >
                                    More Info
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 mt-20">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedCompany.jobProfile} at {selectedCompany.companyName}</h2>
                            <p className="text-gray-700 mb-2"><strong>Location:</strong> {selectedCompany.location}</p>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>
                            {selectedCompany.reviews.map((review, index) => (
                                <div key={index} className="mb-4">
                                    <p className="text-gray-800"><strong>{review.user}</strong> <span className="text-yellow-500">{Array(review.rating).fill('⭐').join('')}</span></p>
                                    <p className="text-gray-700">{review.review}</p>
                                    <hr className="mt-2" />
                                </div>
                            ))}
                        </div>

                        { localStorage.getItem('session_token') !== null ? <div className="bg-white shadow-lg rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Add a Review</h3>
                            <input
                                type="text"
                                name="user"
                                value={newReview.user}
                                onChange={handleReviewChange}
                                placeholder="Your Name"
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <select
                                name="rating"
                                value={newReview.rating}
                                onChange={handleReviewChange}
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            >
                                <option value={0}>Select Rating</option>
                                <option value={1}>1 ⭐</option>
                                <option value={2}>2 ⭐</option>
                                <option value={3}>3 ⭐</option>
                                <option value={4}>4 ⭐</option>
                                <option value={5}>5 ⭐</option>
                            </select>
                            <textarea
                                name="review"
                                value={newReview.review}
                                onChange={handleReviewChange}
                                placeholder="Your Review"
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <button
                                onClick={handleReviewSubmit}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                            >
                                Submit Review
                            </button>
                        </div> : <h1 className="text-3xl font-semibold mb-3">You must login to add a review</h1>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CompanyReviews;
