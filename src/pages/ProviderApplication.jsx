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

const ApplicationsByJob = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-purple-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 sticky top-0 min-h-screen shadow-lg">
        <h2 className="text-2xl font-bold mb-6 animate-pulse">Time Pro</h2>
        <nav className="flex flex-col space-y-5 text-md">
          <Link to="/provider" className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded text-white font-semibold hover:bg-white/20">
            <FaUserCircle /> Profile Overview
          </Link>
          <Link to="/post-job" className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition-all">
            <FaPlusCircle /> Post New Job
          </Link>
          <Link to="/provider/posted-jobs" className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded transition-all">
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
              className="text-[#094DB1] hover:text-[#072b66] transition"
              title="Back to Posted Jobs"
            >
              <FaArrowLeft size={22} />
            </Link>
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h2 className="text-2xl font-bold text-[#1F1F1F]">Applications</h2>
          </div>
          <Link
            to="/login"
            className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700"
          >
            Logout
          </Link>
        </header>

        {/* Content */}
        <section className="p-10">
          {loading ? (
            <p>Loading applications...</p>
          ) : applications.length === 0 ? (
            <p>No applications found for this job.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {applications.map((app) => (
                <motion.div
                  key={app._id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border shadow-md rounded-xl p-6 space-y-2 transition"
                >
                  <h4 className="text-xl font-semibold text-blue-900">{app.applicant?.name}</h4>
                  <p><strong>Email:</strong> {app.applicant?.email}</p>
                  <p><strong>Status:</strong> <span className="capitalize">{app.status}</span></p>

                  {app.resumeUrl && (
                    <p className="flex items-center gap-2 text-sm mt-2">
                      <FaFileAlt className="text-blue-500" />
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

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleStatusChange(app._id, 'accepted')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, 'rejected')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, 'pending')}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-full text-sm"
                    >
                      Pending
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        
      </main>
    </div>
  );
};

export default ApplicationsByJob;
