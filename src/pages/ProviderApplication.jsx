import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';
import {
  FaArrowLeft,
  FaBriefcase,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle,
  FaFileAlt,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const handleLogout = async () => {
  const token = localStorage.getItem('token');

  try {
    await axios.post(
      'http://localhost:5000/api/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login after logout
  } catch (err) {
    console.error('Logout failed:', err);
    alert('Logout failed. Try again.');
  }
};

const ApplicationsByJob = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/provider/jobs/${jobId}/applications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/provider/applications/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Status updated and email sent');
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
  }, [jobId]);

  const filteredApplications =
    filter === 'all'
      ? applications
      : applications.filter((app) => app.status === filter);

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-cyan-600 to-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-lg">
        <h2 className="text-2xl font-bold mb-6 animate-pulse">Time Pro</h2>
        <nav className="flex flex-col space-y-5 text-md">
          <Link to="/provider" className="flex items-center gap-3 px-4 py-2 rounded text-white font-semibold hover:bg-cyan-800 ">
            <FaUserCircle /> Profile Overview
          </Link>
          <Link to="/post-job" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaPlusCircle /> Post New Job
          </Link>
          <Link to="/provider/posted-jobs" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition-all">
            <FaBriefcase /> Manage Jobs
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/provider/posted-jobs"
              className="text-cyan-700 hover:text-cyan-900 transition"
              title="Back to Posted Jobs"
            >
              <FaArrowLeft size={22} />
            </Link>
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h2 className="text-2xl font-bold text-cyan-600">Time Pro</h2>
          </div>
          <Link
            to="/provider"
            className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-600 transition"
          >
            Dashboard
          </Link>
        </header>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mt-6 mb-6">
          {['all', 'accepted', 'rejected', 'pending'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full font-medium border transition duration-300 ${
                filter === status
                  ? 'bg-cyan-600 text-white border-cyan-600'
                  : 'bg-white text-cyan-600 border-cyan-600 hover:bg-cyan-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Applications Content */}
        <section className="p-10">
          {loading ? (
            <p className="text-gray-500">Loading applications...</p>
          ) : filteredApplications.length === 0 ? (
            <p className="text-gray-500">No applications found for this filter.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredApplications.map((app) => (
                <motion.div
                  key={app._id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border-2 border-cyan-700 shadow-md rounded-xl p-6 space-y-3 transition"
                >
                  <h4 className="text-xl font-semibold text-cyan-800">{app.applicant?.name}</h4>
                  <p className="text-gray-700"><strong>Email:</strong> {app.applicant?.email}</p>
                  <p className="text-gray-700"><strong>Status:</strong> <span className="capitalize">{app.status}</span></p>

                  {app.resumeUrl && (
                    <p className="flex items-center gap-2 text-sm mt-2">
                      <FaFileAlt className="text-cyan-600" />
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Resume
                      </a>
                    </p>
                  )}

                  {/* Conditional Status Buttons */}
                  <div className="flex gap-3 mt-4 flex-wrap">
                    {app.status !== 'accepted' && (
                      <button
                        onClick={() => handleStatusChange(app._id, 'accepted')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm"
                      >
                        Accept
                      </button>
                    )}
                    {app.status !== 'rejected' && (
                      <button
                        onClick={() => handleStatusChange(app._id, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
                      >
                        Reject
                      </button>
                    )}
                    {app.status !== 'pending' && (
                      <button
                        onClick={() => handleStatusChange(app._id, 'pending')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-full text-sm"
                      >
                        Pending
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="bg-white py-4 text-center text-sm text-gray-500 border-t mt-110">
          <img src={logo} alt="Time Pro Logo" className="h-6 mx-auto mb-2" />
          <p>© 2025 Time Pro • Empowering careers one job at a time.</p>
        </footer>
      </main>
    </div>
  );
};

export default ApplicationsByJob;
