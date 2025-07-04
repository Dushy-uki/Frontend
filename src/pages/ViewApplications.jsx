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
      <aside className="w-64 bg-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
              <nav className="flex flex-col space-y-5 text-lg">
                <Link to="/admin" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded font-semibold">
                  Dashboard
                </Link>
                <Link to="/admin/manage-jobs" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
                  <FaBriefcase /> Manage Jobs
                </Link>
                <Link to="/admin/user" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
                  <FaUserGraduate /> Manage Users
                </Link>
                <Link to="/admin/payment" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
                  <FaUsers /> Payments
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
          <Link to="/login" className="bg-cyan-600 text-black px-5 py-2 rounded-full hover:bg-cyan-800 transition">
            Login
          </Link>
        </header>

        {/* Applications */}
        <section className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-cyan-800">Applications for This Job</h2>
          
          {applications.length === 0 ? (
            <p className="text-gray-600 text-lg">No applications yet for this job.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {applications.map((app) => (
                <div key={app._id} className="bg-white p-6 rounded-lg shadow border-l-4 border-cyan-800 hover:shadow-md transition">
                  <p className="text-gray-700"><strong>Applicant:</strong> {app.applicant?.name} ({app.applicant?.email})</p>
                  <p className="text-gray-700"><strong>Message:</strong> {app.message}</p>
                  <p className="text-gray-700">
                    <strong>Status:</strong>{' '}
                    <span className={`capitalize px-2 py-1 rounded text-sm font-semibold ${
                      app.status === 'accepted'
                        ? 'bg-green-100 text-green-700'
                        : app.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      {app.status}
                    </span>
                  </p>
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm block mt-2"
                  >
                    View Resume
                  </a>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(app._id, 'accepted')}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app._id, 'rejected')}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
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
