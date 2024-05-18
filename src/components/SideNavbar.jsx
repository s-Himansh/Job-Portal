import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const SideNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };



    const [showDropdown, setShowDropDown] = useState(false);
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setShowDropDown(!showDropdown);
    }
    // console.log('here user type is', props.userType);



    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };


    return (
        <div className={`fixed right-0 top-0 h-screen w-64 bg-gray-100 shadow-md bg-gradient-to-br from-blue-100 to-green-100 transition duration-300 ease-in-out ${isOpen ? 'translate-x-full' : '-translate-x-0'} rounded-l-lg`}>
            <button className="absolute top-1/2 -left-8 focus:outline-none z-10" onClick={toggleMenu}>
                {isOpen ? (
                    <svg className="h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="none">
                        <path d="M10 14l6-6-6-6z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                ) : (
                    <svg className="h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="none">
                        <path d="M14 10l6 6-6 6z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                )}
            </button>

            <nav className={`h-full overflow-y-auto px-4 pt-6 pb-8 transition duration-300 ease-in-out ${isOpen ? 'hidden' : 'block'}`}>
                <Link to="/" className="text-gray-800 text-2xl font-semibold hover:text-green-600 transition duration-300">
                    <span className="relative pb-2">Hire<span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></span>Haven</span>
                </Link>
                <ul className="flex flex-col justify-center items-center space-y-4 relative mt-14"> {/* Added relative positioning */}
                    <li>
                        <Link to="/" className=" hidden text-lg font-medium text-gray-700 hover:text-green-600 transition duration-300 hover:border-green-600 block transition-colors duration-300">
                            <span className="flex items-center">
                                <svg className="h-6 w-6 pr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-6 9 6v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9zm9 4V21m0 0v-8m0 8h6m-6 0H6"></path>
                                </svg>
                                Home
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className=" hidden text-lg font-medium text-gray-700 hover:text-green-600 transition duration-300 hover:border-green-600 block transition-colors duration-300">
                            <span className="flex items-center">
                                <svg className="h-6 w-6 pr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-6 9 6v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9zm9 4V21m0 0v-8m0 8h6m-6 0H6"></path>
                                </svg>
                                About
                            </span>
                        </Link>
                    </li>
                    {/* Add more navigation links here */}
                    <Link to='/' className="text-gray-800 hover:text-green-600 transition duration-300 pt-20 text-lg font-medium border-b-2 border-transparent py-2">Home </Link>
                    <Link to='/companyreviews' className="text-gray-800 hover:text-green-600 transition duration-300 text-lg font-medium border-b-2 border-transparent py-2">Company Reviews</Link>
                    <Link to='/' className="text-gray-800 hover:text-green-600 transition duration-300 text-lg font-medium border-b-2 border-transparent py-2">Salary Stats</Link>
                    <Link to={props.userType !== 'Job Seeker' ? '/joblisting' : '/applications'} className="text-gray-800 hover:text-green-600 transition duration-300 text-lg font-medium border-b-2 border-transparent py-2">{props.userType == 'Job Seeker' ? 'My Applications' : 'Add Jobs'}</Link>
                    {props.userType === 'Recruiter' ? <Link className="text-gray-800 hover:text-green-600 transition duration-300 text-lg font-medium border-b-2 border-transparent py-2" to='/alljobs'>My Listings</Link> : null}
                    {/* {props.userType === 'Job Seeker' ? <Link className="text-gray-800 hover:text-green-600 transition duration-300 text-lg font-medium border-b-2 border-transparent py-2"  to='/resume'>Resume</Link> : null} */}

                </ul>
                <button onClick={toggleDropdown} className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-sm text-gray-800 border-2 border-gray-600 rounded-full focus:border-green-600">
                    <img className="h-8 w-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnfAxGV-fZxGL9elM_hQ2tp7skLeSwMyUiwo4lMm1zyA&s" alt="Profile" />
                </button>
                {showDropdown && (
                    <div className="absolute bottom-16 right-40 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <Link to={{pathname : `/profile`, state : {userType : props.userType}}} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-green-600 font-semibold transition-colors duration-300 ease-in-out">My Profile</Link>
                        <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 hover:text-green-600 focus:outline-none font-semibold transition-colors duration-300 ease-in-out">Logout</button>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default SideNavbar;
