import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/applications/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (error) {
        console.error("Failed to fetch applications:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#094DB1] text-white p-6">
             <nav className="flex flex-col space-y-5 mt-10">
               <Link to="/dashboard" className="border-b pb-1">Dashboard</Link>
               <Link to="/jobs" className="border-b pb-1">Job Listing</Link>
               <Link to="/applications" className="border-b pb-1">My Application</Link>
               <Link to="/resume" className="border-b pb-1">My Resume</Link>
               <Link to="/edit-profile" className="border-b pb-1">Edit Profile</Link>
             </nav>
           </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-12" />
            <h3 className="text-2xl font-bold text-[#1F1F1F]">Time Pro</h3>
          </div>
          <Link
            to="/login"
            className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </header>

        {/* Application Section */}
        <section className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">My Job Applications</h2>

          {loading ? (
            <p className="text-gray-500">Loading applications...</p>
          ) : applications.length === 0 ? (
            <p className="text-gray-600">You haven’t applied for any jobs yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app) => (
                <div key={app._id} className="bg-white p-6 rounded-xl shadow-md space-y-3">
                  <h3 className="text-lg font-bold text-[#094DB1]">
                    {app.job?.title || 'Untitled Job'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong>{' '}
                    <span
  className={`px-2 py-1 rounded-full text-sm font-semibold
    ${
      app.status === 'accepted'
        ? 'bg-green-100 text-green-700'
        : app.status === 'rejected'
        ? 'bg-red-100 text-red-700'
        : 'bg-yellow-100 text-yellow-700'
    }`}
>
  {app.status}
</span>

                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Message:</strong> {app.message}
                  </p>
                  {app.resumeUrl && (
                    <a
                      href={`${import.meta.env.VITE_API_URL}/${app.resumeUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View Resume
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyApplications;
