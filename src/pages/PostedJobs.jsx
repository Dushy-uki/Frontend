import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaBriefcase,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle,
  FaTrash,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/provider/my-jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching posted jobs:', error);
      toast.error('Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirmDelete = confirm('Are you sure you want to delete this job?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/provider/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Job deleted successfully!');
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete the job.');
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-purple-100">
       {/* Sidebar */}
            <aside className="w-64 bg-cyan-600 text-white p-6 sticky top-0 min-h-screen shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Time Pro</h2>
              <nav className="flex flex-col space-y-5 text-md">
                <Link to="/provider" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded font-semibold">
                  <FaUserCircle /> Profile Overview
                </Link>
                <Link to="/post-job" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition">
                  <FaPlusCircle /> Post New Job
                </Link>
                <Link to="/provider/posted-jobs" className="flex items-center gap-3 hover:bg-cyan-800 px-4 py-2 rounded transition">
                  <FaBriefcase /> Manage Jobs
                </Link>
              </nav>
            </aside>
      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h2 className="text-2xl font-bold text-gray-800">Time Pro</h2>
          </div>
          <Link
            to="/login"
            className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-600 transition"
          >
            Login
          </Link>
        </header>

        {/* Job Cards */}
        <section className="p-10">
          {loading ? (
            <p className="text-gray-500">Loading posted jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-500">You haven't posted any jobs yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <motion.div
                  key={job._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-cyan-800 transition"
                >
                  <h4 className="text-xl font-bold text-cyan-800 mb-1">{job.title}</h4>
                  <p className="text-gray-700 font-medium">{job.companyName}</p>
                  <p className="text-gray-600">{job.location}</p>
                  <p className="text-sm text-gray-500 mt-1">Salary: {job.salary || 'N/A'}</p>

                  <div className="mt-4 flex justify-between items-center text-sm">
                    <Link
                      to={`/job/${job._id}/applications`}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaClipboardList /> View Applications
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="bg-white py-4 text-center text-sm text-gray-500 border-t mt-116">
          <img src={logo} alt="Time Pro Logo" className="h-6 mx-auto mb-2" />
          <p>© 2025 Time Pro • Empowering careers one job at a time.</p>
        </footer>
      </main>
    </div>
  );
};

export default PostedJobs;
