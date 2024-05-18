import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import FirstPage from './components/FirstPage'
import Check from './components/Check'
import NavBar from './components/NavBar';
import './App.css'
import SignUp from './components/SignUp';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import SideNavbar from './components/SideNavbar';
import JobListings from './recruiter/JobListings';
import JobMoreInfo from './components/JobMoreInfo';
import AllJobs from './recruiter/AllJobs';
import Resume from './components/Resume';
import MyApplications from './components/MyApplications';
import JobApplications from './components/JobApplications';
import ChatSection from './components/ChatSection';
import CompanyReviews from './components/CompanyReviews';

function App() {

  return (
    <Router>
		<div>
			<Routes>
				<Route path='/' element={<FirstPage />} />
				<Route path='/check' element={<Check />} />
				<Route path='/navbar' element={<NavBar />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/login' element={<Login />} />
				<Route path='/profile' element={<UserProfile />} />
				<Route path='/sidenavbar' element={<SideNavbar />} />
				<Route path='/joblisting' element={<JobListings />} />
				<Route path='/jobs/:jobId' element={<JobMoreInfo />} />
				<Route path='/alljobs' element={<AllJobs />} />
				<Route path='/alljobs/jobs/:jobId' element={<JobMoreInfo />} />
				<Route path='/resume' element={<Resume />} />
				<Route path='/applications' element={<MyApplications />} />
				<Route path='/applications/jobs/:jobId' element={<JobMoreInfo />} />
				<Route path='/alljobs/jobApplications/:jobId' element={<JobApplications />}  />
				<Route path='/jobApplications/:jobId' element={<JobApplications />}  />
				<Route path="/applications/chatSection/:rec_id/:user_id/:application_id" element={<ChatSection />} />
				<Route path="/jobApplications/:jobId/chatSection/:rec_id/:user_id/:application_id" element={<ChatSection />} />
				<Route path="alljobs/jobApplications/:jobId/chatSection/:rec_id/:user_id/:application_id" element={<ChatSection />} />
				<Route path='/companyreviews' element={<CompanyReviews />} />
			</Routes>
		</div>
	 </Router>
  )
}

export default App
