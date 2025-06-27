import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import { FaBriefcase, FaUserGraduate, FaUsers } from 'react-icons/fa';


const ViewApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

 useEffect(() => {
  const fetchApplications = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/applications/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err.response?.data || err.message);
    }
  };

  if (jobId) fetchApplications();
}, [jobId]);


  const handleStatusUpdate = async (id, status) => {
    try {
     await axios.patch(`${import.meta.env.VITE_API_URL}/applications/${id}/status`, 
  { status }, 
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });


      // Optimistically update UI
      setApplications(prev =>
        prev.map(app => (app._id === id ? { ...app, status } : app))
      );
    } catch (err) {
      console.error("Failed to update status:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#094DB1] text-white p-6 sticky top-0 min-h-screen">
  <nav className="flex flex-col mt-10 space-y-5 text-md">
    <Link
      to="/admin"
      className="text-xl font-bold text-white mb-4 border-b border-white pb-2"
    >
      Admin Dashboard
    </Link>

    <Link
      to="/admin/manage-jobs"
      className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
    >
      <FaBriefcase className="text-lg" />
      <span>Manage Jobs</span>
    </Link>

    <Link
      to="/admin/user"
      className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
    >
      <FaUserGraduate className="text-lg" />
      <span>Manage Users</span>
    </Link>

    <Link
      to="/admin/payment"
      className="flex items-center gap-2 hover:bg-white/10 rounded px-4 py-2 transition"
    >
      <FaUsers className="text-lg" />
      <span>Payments</span>
    </Link>
  </nav>
</aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100">
        {/* Header */}
        <header className="bg-white flex items-center justify-between px-8 py-4 shadow">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
            <h1 className="text-xl font-bold text-gray-800">Time Pro</h1>
          </div>
          <Link to="/login" className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700">Login</Link>
        </header>

        {/* Applications */}
        <section className="p-8">
          <h2 className="text-2xl font-bold mb-6">Applications for This Job</h2>
          {applications.length === 0 ? (
            <p className="text-gray-600">No applications yet for this job.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {applications.map((app) => (
                <div key={app._id} className="bg-white p-6 rounded-lg shadow space-y-3">
                  <p><strong>Applicant:</strong> {app.applicant?.name} ({app.applicant?.email})</p>
                  <p><strong>Message:</strong> {app.message}</p>
                  <p><strong>Status:</strong> <span className="capitalize">{app.status}</span></p>
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View Resume
                  </a>
                  <div className="mt-3 space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(app._id, 'accepted')}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app._id, 'rejected')}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ViewApplications;
