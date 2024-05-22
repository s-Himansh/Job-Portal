import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import Modal from 'react-modal';

function JobApplications() {
   const { jobId } = useParams();

   const [applications, setApplications] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      const fetchApplications = async (jobId) => {
         const response = await fetch(`http://localhost:5000/fetchapp/${jobId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
         const json = await response.json();
         if (json.success) {
            setApplications(json.allApplications);
         }
      };

      fetchApplications(jobId);
   });

   const closeModal = () => {
      setIsModalOpen(false);
      navigate('/login');
  };

   const handleAccept = async (applicationData) => {
      const response = await fetch(`http://localhost:5000/updateApplication/${applicationData._id + "Accepted"}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const json = await response.json();
      if (json.success) {
         setIsModalOpen(true);
         console.log('success');
      } else {
         alert('Something bad happened! Try again');
         console.log('failure');
      }
   };

   const handleReject = async (applicationData) => {
      const response = await fetch(`http://localhost:5000/updateApplication/${applicationData._id + "Rejected"}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const json = await response.json();
      if (json.success) {
         alert('Rejected Successfully');
         console.log('success');
      } else {
         alert('Something bad happened! Try again');
         console.log('failure');
      }
   };

   return (
      <>
         <div className="absolute font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100">
            <Link to='/'>
               Back
            </Link>
         </div>
         {localStorage.getItem('session_token') !== null ? <SideNavbar userType={JSON.parse(localStorage.getItem('user')).userType} /> : <NavBar />}
         {applications.length !== 0 ?
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col justify-center items-center">
               <h1 className="text-3xl font-semibold mb-7 mt-10">Users Applied</h1>
               <div className="max-w-4xl w-full overflow-hidden">
                  {applications.map((application, index) => (
                     <div key={index} className="bg-white shadow-md p-6 rounded-lg mb-4">
                        <h3 className="text-xl font-semibold mb-2"> Name - {`${application.userData.firstName} ${application.userData.lastName}`}</h3>
                        <p className="text-lg mb-2">Email ID - {application.userData.email}</p>
                        {application.resumePath && (
                           <embed src={`http://localhost:5000/${application.resumePath}`} type="application/pdf" width="100%" height="500px" />
                        )}
                        <div className="flex justify-between mt-4">
                           {application.status === 'Still Processing' ?
                              <>
                                 <button onClick={() => handleAccept(application)} className="bg-gradient-to-br from-green-500 to-green-400 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">Accept</button>
                                 <button onClick={() => handleReject(application)} className="bg-gradient-to-br from-red-500 to-red-400 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">Reject</button>
                              </>
                              : null}
                           {application.status === 'Rejected' ?
                              <>
                                 <button className="bg-gradient-to-br from-red-500 to-red-400 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded ">Rejected</button>
                              </>
                              : null}
                           {application.status === 'Accepted' ?
                              <>
                                 <Link to={`chatSection/${application.jobData.rec_id}/${application.userData._id}/${application._id}`} className="bg-gradient-to-br from-green-500 to-green-400 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded line-clamp-3">Chat with applicant</Link>
                              </>
                              : null}
                        </div>
                     </div>
                  ))}
               </div>
            </div> :
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-green-100">
               <h1 className="text-3xl font-semibold mb-7 mt-10">No users applied yet! Thank you for your patience</h1>
            </div>

         }
         <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
            >
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Accepted Successfully</h2>
                    <p className="text-gray-700 mb-6">Talk with applicant for further processing</p>
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

export default JobApplications;
