import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import UserDashboard from './pages/UserDashboard'; 
import AdminDashboard from './pages/AdminDashboard';
import JobListingPage from './Components/joblisting';
import ManageJobs from './pages/ManageJobs.jsx';
import PostJob from './pages/PostJob.jsx';
import ApplyJob from './pages/Application.jsx';
import ViewApplications from './pages/ViewApplications.jsx';
import MyApplications from './pages/MyApplications.jsx';
import ManageUsers from './Components/ManageUsers.jsx';
import EditProfile from './pages/EditProfile.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenerateResume from './pages/GenerateResume.jsx';
import PaymentSuccess from './pages/payment.jsx';
import AdminPayments from './pages/AdminPayment.jsx';


function App() {
  return (
    <>
     <ToastContainer
        position="top-right"  // You can choose position
        autoClose={3000}      // Toast auto close time in ms
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<JobListingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/resume" element={<GenerateResume />} />
      <Route path="/admin" element={<AdminDashboard />} /> 
      <Route path="/admin/manage-jobs" element={<ManageJobs />} />
      <Route path="/admin/post-job" element={<PostJob />} />
      <Route path="/apply/:jobId" element={<ApplyJob />} />
      <Route path="/admin/applications/:jobId" element={<ViewApplications />} />
      <Route path="/applications" element={<MyApplications />} />
      <Route path="/admin/user" element={<ManageUsers />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/payment" element={<PaymentSuccess />} />
      <Route path="/admin/payment" element={<AdminPayments />} />
      <Route path="/generate-resume" element={<GenerateResume />} />

      {/* Add more routes as needed */}
    </Routes>
    </>
  );
}

export default App;
