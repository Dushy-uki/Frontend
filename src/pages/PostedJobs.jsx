import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaBriefcase,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle,
  FaTrash,
  FaEdit,
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
            <img src={logo} alt="Time Pro Logo" className="h-10" />
            <h2 className="text-2xl font-bold text-[#1F1F1F]">Posted Jobs</h2>
          </div>
          <Link to="/login" className="bg-[#E4ED73] text-black px-5 py-2 rounded-full hover:bg-blue-700 transition">
            Logout
          </Link>
        </header>

        {/* Job Cards */}
        <section className="p-10">
          {loading ? (
            <p>Loading posted jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-500">You haven't posted any jobs yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <motion.div
                  key={job._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl shadow-md p-8 transition border-1 border-black-300"
                >
                  <h4 className="text-2xl font-bold text-[#094DB1] mb-1">{job.title}</h4>
                  <p className="text-gray-700 font-medium">{job.companyName}</p>
                  <p className="text-lg text-gray-500">{job.location}</p>
                  <p className="text-lg font-medium mt-1">Salary: {job.salary}</p>

                  <div className="mt-4 flex justify-between items-center text-sm">
                    <Link
                      to={`/job/${job._id}/applications`}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaClipboardList /> Applications
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
      </main>
    </div>
  );
};

export default PostedJobs;
